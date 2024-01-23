'use server'

import { auth } from "@clerk/nextjs"
import { InputType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()

  if (!userId) {
    return {
      error: "You must be logged in to create a board"
    }
  }
  
}