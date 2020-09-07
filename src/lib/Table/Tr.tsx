import React, { FC, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Data, ExtraTableData, CellType } from './types'
import Td from './Td'
import { RowExpandSection } from './RowExpandSection'
import { get } from 'helpers/collection'

interface TrProps {
  className?: string
  keys: string[]
  rowIndex: number
  originalRow: Data
  extraData?: ExtraTableData
  data: Data[]
  onLoadTable: (r: number, keys: string[], key: string) => void
}
const Tr: FC<TrProps> = ({
  className,
  keys,
  rowIndex,
  originalRow,
  extraData,
  data,
  onLoadTable,
}) => {
  const [row, setRow] = useState<{ [x: string]: any }>({}) //originalRow + extraData props
  const [activeKey, setActiveKey] = useState<string>() // any clicked key cells key
  const [expandKeys, setExpandKeys] = useState<string[]>([]) // array of expanded keys

  // merge original and
  useEffect(() => {
    setRow({ ...originalRow, ...extraData })
  }, [originalRow, extraData])

  const handleSetActiveKey = (
    key: string,
    cellType: CellType,
    rIndex: number, // row
    eIndex: number, // expand
  ) => {
    switch (cellType) {
      case 'array':
        return handleRowExpand(key, eIndex)
      case 'object':
        return handleRowExpand(key, eIndex)
      case 'table':
        return onLoadTable(rIndex, expandKeys.slice(0, eIndex), key)
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
      {/* Regular TR */}
      <Row className={className}>
        {keys.map((key) => (
          <Td
            key={key}
            value={row[key]}
            cellKey={key}
            activeKey={activeKey}
            expandKey={expandKeys[0]}
            rowIndex={rowIndex}
            row={originalRow}
            data={data}
            onCellClick={handleSetActiveKey}
          />
        ))}
      </Row>
      {/* Expand Row */}
      <tr className={className}>
        <Cell colSpan={keys.length}>
          {expandKeys.map((key, index) => (
            <RowExpandSection
              key={index + 1}
              expandIndex={index + 1}
              rowIndex={rowIndex}
              cellKey={key}
              expandKey={expandKeys[index + 1]}
              data={get(row, expandKeys.slice(0, index + 1))}
              onCellClick={handleSetActiveKey}
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

export default Tr

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
