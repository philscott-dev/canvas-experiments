/** @jsx jsx */
import styled from '@emotion/styled'
import { forwardRef, RefObject, useMemo, useState, MouseEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { CellDropdown } from './types'
import { DropdownOption, DropdownHeading, DropdownMenu } from 'lib'
import { useOnClickOutside, useOnClick } from 'hooks'
import { CellType } from './types_new'

interface DropdownProps {
  className?: string
  cellDropdown?: CellDropdown
  cellType: CellType
}

const Dropdown = forwardRef<HTMLElement, DropdownProps>(
  ({ className, cellType, cellDropdown }, ref) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    useOnClickOutside(
      ref as RefObject<HTMLElement>,
      () => setDropdownVisible(false),
      true,
    )

    useOnClick(
      ref as RefObject<HTMLElement>,
      () => setDropdownVisible(true),
      true,
    )

    const title = useMemo(() => cellDropdown?.title(), [cellDropdown])
    const options = useMemo(() => cellDropdown?.options(), [cellDropdown])
    const shouldRender = useMemo(() => cellDropdown?.shouldRender(), [
      cellDropdown,
    ])

    const handleOptionClick = (e: MouseEvent<HTMLButtonElement>) => {
      setDropdownVisible(false)
      cellDropdown?.onClick(e)
    }

    if (!shouldRender || (cellType !== 'text' && cellType !== 'date')) {
      return null
    }

    return (
      <div className={className}>
        <DropdownMenu isVisible={isDropdownVisible}>
          <DropdownHeading>{title}</DropdownHeading>
          {options?.map((option) => (
            <DropdownOption value={option.value} onClick={handleOptionClick}>
              {option.text}
            </DropdownOption>
          ))}
        </DropdownMenu>
      </div>
    )
  },
)

export default styled(Dropdown)``
