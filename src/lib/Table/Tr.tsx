import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Data, ExtraTableData, CellDropdown, CellClickFunction } from './types'
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
  cellDropdown?: CellDropdown
  onLoadTable: (r: number, keys: string[], key: string) => void
  onCellClick?: CellClickFunction
}
const Tr: FC<TrProps> = ({
  className,
  keys,
  rowIndex,
  originalRow,
  extraData,
  data,
  cellDropdown,
  onLoadTable,
  onCellClick,
}) => {
  const [activeKey, setActiveKey] = useState<string>() // any clicked key cells key
  const [expandKeys, setExpandKeys] = useState<string[]>([]) // array of expanded keys

  const handleCellClick: CellClickFunction = (
    e,
    key,
    cellType,
    rIndex, // row
    eIndex, // expand
    cellData,
    rowData,
    tableData,
  ) => {
    switch (cellType) {
      case 'array':
        handleRowExpand(key, eIndex)
        break
      case 'object':
        handleRowExpand(key, eIndex)
        break
      case 'table':
        onLoadTable(rIndex, expandKeys.slice(0, eIndex), key)
        break
      default:
        setActiveKey(key === activeKey ? undefined : key)
    }

    // pass to prop
    if (onCellClick) {
      onCellClick(
        e,
        key,
        cellType,
        rIndex,
        eIndex,
        cellData,
        rowData,
        tableData,
      )
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

  const getColSpan = () => {
    // I'm always adding 1 - it doesnt seem to hurt anything
    // it's there just in case theres a checkbox cell
    return keys.length + 1
  }

  return (
    <>
      {/* Regular TR */}
      <Row className={className}>
        <Td
          key={'table__checkbox'}
          cellKey={'table__checkbox'}
          rowIndex={rowIndex}
          row={originalRow}
          expandKey={expandKeys[0]}
          extraData={extraData}
          data={data}
        />
        {keys.map((key) => (
          <Td
            key={key}
            cellKey={key}
            activeKey={activeKey}
            expandKey={expandKeys[0]}
            rowIndex={rowIndex}
            row={originalRow}
            extraData={extraData}
            data={data}
            cellDropdown={cellDropdown}
            onCellClick={handleCellClick}
          />
        ))}
      </Row>
      {/* Expand Row */}
      <tr className={className}>
        <Cell colSpan={getColSpan()}>
          {expandKeys.map((key, index) => (
            <RowExpandSection
              key={index + 1}
              expandIndex={index + 1}
              rowIndex={rowIndex}
              cellKey={key}
              data={data}
              expandKey={expandKeys[index + 1]}
              row={get(originalRow, expandKeys.slice(0, index + 1))}
              cellDropdown={cellDropdown}
              onCellClick={handleCellClick}
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
