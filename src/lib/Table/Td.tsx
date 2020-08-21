/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { Data, ValueType } from './types'
import { useValueTypeCustom } from './useValueTypeCustom'
import RowExpandArrow from './RowExpand/RowExpandArrow'

export interface TableHeadingProps {
  className?: string
  row: Data
  data: Data[]
  rowIndex: number
  cellKey: string
  activeKey?: string
  expandKey?: string
  value?: ValueType
  onCellClick: (key: string, isExpandable: boolean) => void
}

const Td: FC<TableHeadingProps> = ({
  row,
  data,
  rowIndex,
  className,
  cellKey,
  expandKey,
  activeKey,
  value,
  onCellClick,
}) => {
  const cell = useValueTypeCustom(row, data, rowIndex, value)
  const handleCellClick = () => {
    onCellClick(cellKey, cell.type === 'object')
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
        <p>{cell.value}</p>
        {cell.type === 'object' ? (
          <RowExpandArrow isActive={expandKey === cellKey} />
        ) : null}
      </Cell>
    </TdWrapper>
  )
}

export default Td

const TdWrapper = styled.td<{ isExpanded: boolean; hasExpandKey: boolean }>`
  vertical-align: top;
  min-height: 40px;
  font-weight: 300;
  box-sizing: border-box;
  padding: 0;
  &:nth-of-type(1) {
    & > button {
      border-radius: ${({ hasExpandKey }) =>
        hasExpandKey ? '8px 0 0 0' : '8px 0 0 8px'};
    }
  }
  &:nth-last-of-type(1) {
    & > button {
      border-radius: ${({ hasExpandKey }) =>
        hasExpandKey ? '0 8px 0 0 ' : '0 8px 8px 0'};
    }
  }
`

type CellType = 'text' | 'array' | 'object' | 'date'

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
  transition: all 0.1s ease-in-out;
`
