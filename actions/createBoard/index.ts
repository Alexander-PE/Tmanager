'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { CreateSafeAction } from "@/lib/create-safe-action"
import { CreateBoard } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()

  if (!userId) {
    return {
      error: "You must be logged in to create a board"
    }
  }

  const { title } = data
  let board

  try {
    board = await db.board.create({
      data: {
        title,

      }
    })
  } catch (error) {
    return {
      error: "Failed to create board"
    }
  }

  revalidatePath(`/board/${board.id}`)
  return {data: board}
}

export const createBoard = CreateSafeAction(CreateBoard, handler)

