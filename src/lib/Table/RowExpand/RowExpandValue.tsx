/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useEffect, useState } from 'react'
import { jsx } from '@emotion/react'
import { FiDatabase } from 'react-icons/fi'
import { splitAndUpperCase } from 'helpers/string'
import { ValueType } from '../types'
import { useValueType } from '../hooks/useValueType'
import RowExpandArrow from './RowExpandArrow'
import RowExpandValueHeading from './RowExpandValueHeading'
import RowExpandValueText from './RowExpandValueText'

interface RowExpandValueProps {
  className?: string
  cellKey: string
  expandKey: string
  index: number
  value: ValueType
  onExpand: (key: string, index: number) => void
}
const RowExpandValue: FC<RowExpandValueProps> = ({
  className,
  cellKey,
  expandKey,
  index,
  value,
  onExpand,
}) => {
  const cell = useValueType(value)
  const [title, setTitle] = useState('')
  useEffect(() => {
    setTitle(splitAndUpperCase(cellKey || ''))
  }, [cellKey])

  const handleClick = () => {
    if (cell.type === 'object') {
      onExpand(cellKey, index)
    }

    switch (cell.type) {
      case 'array':
        return onExpand(cellKey, index)
      case 'object':
        return onExpand(cellKey, index)
      case 'table':
        return
      default:
        return
    }
  }
  return (
    <ValueButton
      className={className}
      isActive={expandKey === cellKey}
      onMouseDown={handleClick}
    >
      <RowExpandValueHeading>{title}</RowExpandValueHeading>
      <Flex>
        {cell.type === 'table' ? (
          <DataIconWrap>
            <FiDatabase />
          </DataIconWrap>
        ) : null}
        <RowExpandValueText>{cell.value}</RowExpandValueText>
        {cell.type === 'object' || cell.type === 'array' ? (
          <RowExpandArrow isActive={expandKey === cellKey} />
        ) : null}
      </Flex>
    </ValueButton>
  )
}

export default RowExpandValue

const ValueButton = styled.button<{ isActive: boolean }>`
  box-sizing: border-box;
  padding: 6px;
  margin: 0;
  margin-right: 24px;
  min-width: 88px;
  outline: none;
  border-radius: 2px;
  cursor: pointer;
  background: transparent;
  border: 2px solid
    ${({ theme, isActive }) =>
      isActive ? theme.color.blue[300] : 'transparent'};
  &:hover {
    border: 2px solid ${({ theme }) => theme.color.blue[300]};
  }
  transition: all 0.1s ease-in-out;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const DataIconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: ${({ theme }) => theme.color.white[100]};
`
