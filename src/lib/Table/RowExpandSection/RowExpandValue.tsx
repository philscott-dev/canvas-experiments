import styled from '@emotion/styled'
import { FC, useEffect, useState, MouseEvent } from 'react'
import { FiDatabase } from 'react-icons/fi'
import { splitAndUpperCase } from 'helpers/string'
import { Data, CellClickFunction } from '../types'
import { useValueType } from '../hooks/useValueType'
import RowExpandArrow from './RowExpandArrow'
import RowExpandValueHeading from './RowExpandValueHeading'
import RowExpandValueText from './RowExpandValueText'

interface RowExpandValueProps {
  className?: string
  cellKey: string
  expandKey: string
  expandIndex: number
  rowIndex: number
  row: Data
  data: Data[]
  onCellClick?: CellClickFunction
}
const RowExpandValue: FC<RowExpandValueProps> = ({
  className,
  cellKey,
  expandKey,
  expandIndex,
  rowIndex,
  row,
  data,
  onCellClick,
}) => {
  const cell = useValueType(rowIndex, cellKey, row)
  const [title, setTitle] = useState('')
  useEffect(() => {
    setTitle(splitAndUpperCase(cellKey || ''))
  }, [cellKey])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onCellClick) {
      onCellClick(
        e,
        cellKey,
        cell.type,
        rowIndex,
        expandIndex,
        row[cellKey],
        row,
        data,
      )
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
