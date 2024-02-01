'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { CreateSafeAction } from "@/lib/create-safe-action"
import { UpdateBoard } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "You must be logged in to update a board"
    }
  }

  const { title, id } = data

  let board

  try {
    board = await db.board.update({
      where: { id, orgId },
      data: { title }
    })
  } catch (error) {
    return {
      error: "Failed to update board"
    }
  }

  revalidatePath(`/board/${id}`)
  return { data: board }
}

export const updateBoard = CreateSafeAction(UpdateBoard, handler)