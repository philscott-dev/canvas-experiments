import React, { FC, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Data, ExtraTableData, CellType } from './types'
import Td from './Td'
import RowExpandSection from './RowExpand/RowExpandSection'
import get from 'lodash/get'

interface TrExpandProps {
  className?: string
  keys: string[]
  index: number
  originalRow: Data
  extraData?: ExtraTableData
  data: Data[]
  onLoadTable: (key: string, index: number) => void
}
const TrExpand: FC<TrExpandProps> = ({
  className,
  keys,
  index,
  originalRow,
  extraData,
  data,
  onLoadTable,
}) => {
  const [row, setRow] = useState<{ [x: string]: any }>({})
  const [activeKey, setActiveKey] = useState<string>() // any clicked key cells key
  const [expandKeys, setExpandKeys] = useState<string[]>([])

  // merge original and
  useEffect(() => {
    setRow({ ...originalRow, ...extraData })
  }, [originalRow, extraData])

  const handleSetActiveKey = (
    key: string,
    cellType: CellType,
    index: number,
  ) => {
    switch (cellType) {
      case 'array':
        return handleRowExpand(key, index)
      case 'object':
        return handleRowExpand(key, index)
      case 'table':
        return onLoadTable(key, index)
      default:
        setActiveKey(key === activeKey ? undefined : key)
    }
  }

  const handleRowExpand = (key: string, index: number) => {
    setActiveKey(undefined)
    if (key === expandKeys[index]) {
      setExpandKeys([...expandKeys.slice(0, index)])
    } else {
      setExpandKeys([...expandKeys.slice(0, index), key])
    }
  }

  return (
    <>
      <Row className={className}>
        {keys.map((key) => (
          <Td
            key={key}
            value={row[key]}
            cellKey={key}
            activeKey={activeKey}
            expandKey={expandKeys[0]}
            rowIndex={index}
            row={originalRow}
            data={data}
            onCellClick={handleSetActiveKey}
          />
        ))}
      </Row>
      {/* Expand Row*/}
      <tr className={className}>
        <Cell colSpan={keys.length}>
          {expandKeys.map((key, index) => (
            <RowExpandSection
              key={index + 1}
              index={index + 1}
              cellKey={key}
              expandKey={expandKeys[index + 1]}
              data={get(row, expandKeys.slice(0, index + 1))}
              onExpand={handleRowExpand}
            />
          ))}
        </Cell>
      </tr>
      {/* Spacer Row */}
      <tr>
        <Spacer />
      </tr>
    </>
  )
}

export default TrExpand

export const Row = styled.tr`
  max-height: 40px;
  box-sizing: border-box;
  padding: 0;
  /* &:hover {
    & > div > button {
      background: ${({ theme }) => theme.color.indigo[300]};
    }
  } */
`

const Spacer = styled.td`
  padding-bottom: 12px;
`

const Cell = styled.td`
  box-sizing: border-box;
  padding: 0;
`
