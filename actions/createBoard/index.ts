'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { CreateSafeAction } from "@/lib/create-safe-action"
import { CreateBoard } from "./schema"
import { hasAvailableCount, decreaseAvailableCount } from "@/lib/org-limits"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "You must be logged in to create a board"
    }
  }

  const canCreate = await hasAvailableCount()
  if (!canCreate) { return { error: "You have reached the maximum number of boards" } }
  const { title, image } = data
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|")

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
    return {
      error: "Invalid image"
    }
  }

  let board

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      }
    })

    await decreaseAvailableCount()
  } catch (error) {
    return {
      error: "Failed to create board"
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const createBoard = CreateSafeAction(CreateBoard, handler)

