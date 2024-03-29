'use client'

import { updateList } from "@/actions/updateList"
import { FormInput } from "@/components/form/form-input"
import { useAction } from "@/hooks/use-action"
import { List } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"
import { useEventListener } from "usehooks-ts"
import { ListOptions } from "./list-options"

interface ListHeaderProps {
  data: List
  onAddCard: () => void
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {

  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const inputRef = useRef<ElementRef<'input'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)

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

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit()
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    if (title === data.title) {
      disableEditing()
      return
    }

    execute({ id, title, boardId })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  return (
    <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
      {
        isEditing ? (
          <form action={onSubmit} ref={formRef} className='flex-1 px-[2px]'>
            <input id="id" name="id" value={data.id} hidden />
            <input id="boardId" name="boardId" value={data.boardId} hidden />
            <FormInput className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input transition truncate bg-transparent focus:bg-white" ref={inputRef} onBlur={onBlur} id="title" placeholder="Enter list title..." defaultValue={title} />
            <button type="submit" hidden/>
          </form>
        ) : (
          <div onClick={enableEditing} className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'>
            {data.title}
          </div>
        )
      }
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  )
}

