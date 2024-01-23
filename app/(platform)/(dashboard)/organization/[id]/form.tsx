"use client"

import { create } from "@/actions/createBoard"
import { FormInput } from "./input"
import { useFormState } from "react-dom"
import { FormButton } from "./form-button"

export const Form = () => {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(create, initialState)

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <FormButton />
    </form>
  )
}