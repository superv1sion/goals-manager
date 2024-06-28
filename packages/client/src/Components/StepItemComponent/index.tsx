import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import { useStore } from '@/store/stepsStore'
import { Item } from '@/types/item'

import IconCheckbox from '../IconCheckbox/index'

interface StepItemComponentProps {
  item: Item
  itemIndex: number
  stepNumber: number
  removeItem: (index: number) => void
  onEditCallback?: (isEdit: boolean) => void
  readOnly?: boolean
}

const StepItemComponent = observer(
  ({
    item,
    itemIndex,
    onEditCallback,
    stepNumber,
    removeItem,
    readOnly,
  }: StepItemComponentProps): ReactElement => {
    const [isHovered, setIsHovered] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const store = useStore()
    const { editItem, toggleCheck } = store
    // const item = store.draftPlan.steps[stepNumber].items[itemIndex]

    const handleCheckboxClick = (): void => {
      toggleCheck(stepNumber, itemIndex)
    }
    const editItemConfirm = (text: string): void => {
      editItem(stepNumber, itemIndex, text)
    }
    const enableEditMode = (): void => {
      setEditMode(true)
      if (onEditCallback) onEditCallback(true)
    }
    const disableEditMode = (): void => {
      setEditMode(false)
      if (onEditCallback) onEditCallback(false)
    }

    return (
      <li
        className="mb-2 flex justify-between"
        key={itemIndex}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {editMode ? (
          <ItemInput onConfirm={editItemConfirm} disableEditeMode={disableEditMode} />
        ) : (
          <>
            {itemIndex + 1 + '. '}
            {item.text}
            {!readOnly ? (
              <span className="flex items-center">
                <IconCheckbox
                  isChecked={item.isReady}
                  hovered={isHovered}
                  onClick={handleCheckboxClick}
                />

                <button className="mr-1 size-5" onClick={enableEditMode}>
                  <PencilSquareIcon className="size-full self-end text-black-500" />
                </button>

                <button
                  className="mr-1 size-5"
                  onClick={(e) => {
                    e.preventDefault()
                    removeItem(itemIndex)
                  }}
                >
                  <TrashIcon className="size-full text-black-500" />
                </button>
              </span>
            ) : null}
          </>
        )}
      </li>
    )
  }
)

export default StepItemComponent
