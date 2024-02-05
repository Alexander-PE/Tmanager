'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { CreateSafeAction } from "@/lib/create-safe-action"
import { UpdateListOrder } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "You must be logged in"
    }
  }

  const { items, boardId } = data

  let lists

  try {
    const transaction = items.map((item) =>
      db.list.update({
        where: { id: item.id, board: { orgId } },
        data: { order: item.order }
      })
    )

    lists = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: "Failed to reorder"
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: lists }
}

export const updateListOrder = CreateSafeAction(UpdateListOrder, handler)