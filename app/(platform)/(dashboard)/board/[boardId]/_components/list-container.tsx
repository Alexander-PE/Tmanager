'use client'

import { ListWithCards } from '@/types'
import { useEffect, useState } from 'react'
import { ListForm } from './list-form'
import { ListItem } from './list-item'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useAction } from '@/hooks/use-action'
import { updateListOrder } from '@/actions/updateListOrder'
import { toast } from 'sonner'
import { updateCardOrder } from '@/actions/updateCardOrder'


interface ListContainerProps {
  boardId: string
  data: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: (data) => {
      toast.success('List order updated')
    },
    onError: (error) => {
      toast.error('Failed to update order')
    },
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: (data) => {
      toast.success('Card order updated')
    },
    onError: (error) => {
      toast.error('Failed to update order')
    },
  })

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result
    if (!destination) {
      return
    }

    // If the item is dropped in the same position, do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // User moved a list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({ ...item, order: index }))
      setOrderedData(items)
      executeUpdateListOrder({ items, boardId })
    }

    // User moved a card
    if (type === 'card') {
      let newOrderedData = [...orderedData]

      // Find the source and destination lists
      const sourceList = newOrderedData.find(list => list.id === source.droppableId);
      const destList = newOrderedData.find(list => list.id === destination.droppableId);

      if (!sourceList || !destList) {
        return
      }

      // check if cards exist in source list
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      // check if cards exist in destination list
      if (!destList.cards) {
        destList.cards = []
      }

      // moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index)
        reorderedCards.forEach((card, index) => {
          card.order = index
        })

        sourceList.cards = reorderedCards
        setOrderedData(newOrderedData)
        executeUpdateCardOrder({ boardId: boardId, items: reorderedCards})
        // user moved the card to a different list
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        // assign the new list id to the moved card
        movedCard.listId = destination.droppableId
        // add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard)
        // update the order of the cards in the source list
        sourceList.cards.forEach((card, index) => {
          card.order = index
        })
        // update the order of the cards in the destination list
        destList.cards.forEach((card, index) => {
          card.order = index
        })

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({ boardId: boardId, items: destList.cards})
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {(provided) => (
          <ol {...provided.droppableProps} ref={provided.innerRef} className='flex gap-x-3 h-full'>
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className='flex-shrink-0 w-1' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}