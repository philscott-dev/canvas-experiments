import styled from '@emotion/styled'
import { FC, MouseEvent, useRef } from 'react'
import { useValueType } from './hooks/useValueType'
import RowExpandArrow from './RowExpandSection/RowExpandArrow'
import { FiDatabase } from 'react-icons/fi'
import { Data, CellType, ExtraTableData, CellClickFunction } from './types'
import { useOnClickOutside } from 'hooks'

export interface TableHeadingProps {
  className?: string
  row: Data
  extraData?: ExtraTableData
  data: Data[]
  rowIndex: number
  cellKey: string
  activeKey?: string
  expandKey?: string
  onCellClick?: CellClickFunction
}

const Td: FC<TableHeadingProps> = ({
  row,
  extraData,
  data,
  rowIndex,
  className,
  cellKey,
  expandKey,
  onCellClick,
}) => {
  // const dropdownRef = useRef()
  // useOnClickOutside(dropdownRef, () => {}, true)

  const cell = useValueType(rowIndex, cellKey, row, data, extraData)

  const handleCellClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onCellClick) {
      onCellClick(e, cellKey, cell.type, rowIndex, 0, row[cellKey], row, data)
    }
  }
  return (
    <TdWrapper
      className={className}
      hasExpandKey={!!expandKey}
      isExpanded={expandKey === cellKey}
    >
      <Cell
        type="button"
        cell={cell.type}
        isExpanded={expandKey === cellKey}
        onMouseDown={handleCellClick}
      >
        {cell.type === 'jsx' ? (
          cell.value
        ) : (
          <>
            {cell.type === 'table' ? (
              <DataIconWrap>
                <FiDatabase />
              </DataIconWrap>
            ) : null}
            <p>{cell.value}</p>
            {cell.type === 'object' || cell.type === 'array' ? (
              <RowExpandArrow isActive={expandKey === cellKey} />
            ) : null}
          </>
        )}
      </Cell>
    </TdWrapper>
  )
}

export default Td

const TdWrapper = styled.td<{ isExpanded: boolean; hasExpandKey: boolean }>`
  position: relative;
  vertical-align: top;
  min-height: 40px;
  font-weight: 300;
  box-sizing: border-box;
  padding: 0;
  &:nth-of-type(1) {
    & > button {
      border-top-left-radius: 8px;
      border-bottom-left-radius: ${({ hasExpandKey }) =>
        hasExpandKey ? '0' : '8px'};
    }
  }
  &:nth-last-of-type(1) {
    & > button {
      border-top-right-radius: 8px;
      border-bottom-right-radius: ${({ hasExpandKey }) =>
        hasExpandKey ? '0' : '8px'};
    }
  }
`

const Cell = styled.button<{ cell: CellType; isExpanded: boolean }>`
  outline: none;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 12px;
  min-height: 40px;
  width: 100%;
  cursor: pointer;
  border: 2px solid transparent;
  background: ${({ theme, isExpanded }) =>
    isExpanded ? theme.color.indigo[300] : theme.color.indigo[400]};
  &:hover {
    border: 2px solid ${({ theme }) => theme.color.blue[300]};
  }
  & > p {
    font-size: 12px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    margin: 0;
    padding: 0;
    -webkit-box-orient: vertical;
    word-break: break-all;
    white-space: ${({ cell }) =>
      cell === 'object' || cell === 'date' ? 'nowrap' : 'inherit'};
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.color.white[100]};
  }

  & > * {
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.color.white[100]};
  }
  transition: all 0.1s ease-in-out;
`

const DataIconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: ${({ theme }) => theme.color.white[100]};
`
