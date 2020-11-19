/** @jsx jsx */
import styled from '@emotion/styled'
import { forwardRef, RefObject, useMemo, useState, MouseEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { CellDropdown } from './types'
import { DropdownOption, DropdownHeading, DropdownMenu } from 'lib'
import { useOnClickOutside, useOnClick } from 'hooks'
import { CellState, CellType } from './types_new'
import { isFunction } from 'lodash'
import { ServiceLinkHeading } from 'components/ServiceLinkHeading'

interface DropdownProps {
  className?: string
  cellDropdown?: CellDropdown
  cell: CellState
}

const Dropdown = forwardRef<HTMLElement, DropdownProps>(
  ({ className, cell, cellDropdown }, ref) => {
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

    const title = useMemo(() => cellDropdown?.title(cell), [cellDropdown, cell])
    const options = useMemo(() => cellDropdown?.options(cell), [
      cellDropdown,
      cell,
    ])
    const shouldRender = useMemo(
      () =>
        isFunction(cellDropdown?.shouldRender)
          ? cellDropdown?.shouldRender(cell)
          : true,
      [cellDropdown, cell],
    )

    const handleOptionClick = (e: MouseEvent<HTMLButtonElement>) => {
      setDropdownVisible(false)
      cellDropdown?.onClick(e, cell)
    }

    if (!shouldRender || (cell.type !== 'text' && cell.type !== 'date')) {
      return null
    }

    return (
      <div className={className}>
        <DropdownMenu isVisible={isDropdownVisible}>
          <DropdownHeading>{title}</DropdownHeading>
          {options?.map((option, index) => (
            <DropdownOption
              key={index}
              value={option.value}
              onClick={handleOptionClick}
            >
              {/* Pivot Secific*/}
              <ServiceLinkHeading
                title={option.title}
                subtitle={option.subtitle}
                color={option.color}
                showCount={false}
                css={css`
                  margin-top: 8px;
                  margin-bottom: 0;
                `}
              />
            </DropdownOption>
          ))}
        </DropdownMenu>
      </div>
    )
  },
)

export default styled(Dropdown)`
  position: absolute;
`
