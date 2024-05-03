import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useState } from 'react'

import ItemInput from '@/Components/ItemInput'
import { Item } from '@/types/item'

import IconCheckbox from '../IconCheckbox/index'

const StepItemComponent = ({
  item,
  index,
  stepNumber,
  deleteItem,
  editItem,
  toggleCheck,
}: {
  item: Item
  index: number
  stepNumber: number
  deleteItem: (stepIdx: number, itemIdx: number) => void
  editItem: (stepIdx: number, itemIdx: number, newText: string) => void
  toggleCheck: (stepIdx: number, itemIdx: number) => void
}): ReactElement => {
  const [isHovered, setIsHovered] = useState(false)
  // const [isChecked, setIsChecked] = useState(item.isReady)
  const [editing, setEditing] = useState(false)

  const handleCheckboxClick = (): void => {
    // setIsChecked((prevState) => !prevState)
    toggleCheck(stepNumber, index)
  }
  const editItemConfirm = (text): void => {
    editItem(stepNumber, index, text)
  }

  return (
    <li
      className="mb-2 flex justify-between"
      key={index}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {editing ? (
        <ItemInput onConfirm={editItemConfirm} onBlurHandler={setEditing} />
      ) : (
        <>
          {index + 1 + '. '}
          {item.text}
          <span className="flex items-center">
            <IconCheckbox
              isChecked={item.isReady}
              hovered={isHovered}
              onClick={handleCheckboxClick}
            />

            <button className="mr-1 size-5" onClick={() => setEditing(true)}>
              <PencilSquareIcon className="size-full self-end text-black-500" />
            </button>

            <button className="mr-1 size-5" onClick={() => deleteItem(stepNumber, index)}>
              <TrashIcon className="size-full text-black-500" />
            </button>
          </span>
        </>
      )}
      {/* {index + 1 + '. '} */}
      {/* {item.text} */}
      {/* <span className="flex items-center"> */}
      {/*  <IconCheckbox isChecked={isChecked} hovered={isHovered} onClick={handleCheckboxClick} /> */}

      {/*  <button className="mr-1 size-5" onClick={() => setEditing(true)}> */}
      {/*    <PencilSquareIcon className="size-full self-end text-black-500" /> */}
      {/*  </button> */}

      {/*  <button className="mr-1 size-5" onClick={() => deleteItem(stepNumber, index)}> */}
      {/*    <TrashIcon className="size-full text-black-500" /> */}
      {/*  </button> */}
      {/* </span> */}
    </li>
  )
}

export default StepItemComponent