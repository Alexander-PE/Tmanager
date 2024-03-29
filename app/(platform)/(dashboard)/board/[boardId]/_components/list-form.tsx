'use client'

import { Plus, X } from "lucide-react"
import { ListWrapper } from "./list-wrapper"
import { useRef, useState, ElementRef } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { FormInput } from "@/components/form/form-input"
import { useParams, useRouter } from "next/navigation"
import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { createList } from "@/actions/createList"
import { toast } from "sonner"

export const ListForm = () => {
  const router = useRouter()
  const params = useParams()

  const [IsEditing, setIsEditing] = useState(false)
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    });
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`)
      disableEditing()
      router.refresh()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    execute({ title, boardId })
  }

  if (IsEditing) {
    return (
      <ListWrapper>
        <form action={onSubmit} ref={formRef} className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
          <FormInput errors={fieldErrors} ref={inputRef} placeholder="Enter list title..." id="title" className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition" />
          <input value={params.boardId} name={"boardId"} hidden />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
              Add List
            </FormSubmit>
            <Button onClick={disableEditing} size={'sm'} variant={'ghost'}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button onClick={enableEditing} className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
        <Plus className="w-4 h-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  )
}

