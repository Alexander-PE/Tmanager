'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { CreateSafeAction } from "@/lib/create-safe-action"
import { UpdateCard } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "You must be logged in to update a card"
    }
  }

  const { boardId, id, ...values } = data
  let card

  try {
    card = await db.card.update({
      where: { id, list: { board: { orgId } } },
      data: { ...values }
    })
  } catch (error) {
    return {
      error: "Failed to update card"
    }
  }

  revalidatePath(`/board/${id}`)
  return { data: card }
}

export const updateCard = CreateSafeAction(UpdateCard, handler)