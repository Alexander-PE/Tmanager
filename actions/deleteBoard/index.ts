'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { CreateSafeAction } from "@/lib/create-safe-action"
import { DeleteBoard } from "./schema"
import { redirect } from "next/navigation"
import { incrementAvailableCount } from "@/lib/org-limits"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "You must be logged in to delete a board"
    }
  }

  const { id } = data

  let board

  try {
    board = await db.board.delete({
      where: { id, orgId }
    })

    await incrementAvailableCount()
  } catch (error) {
    return {
      error: "Failed to delete"
    }
  }

  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}

export const deleteBoard = CreateSafeAction(DeleteBoard, handler)