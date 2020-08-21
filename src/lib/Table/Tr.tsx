import React, { FC, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Data, ExtraTableData } from './types'
import { RowExpand } from './RowExpand'
import Td from './Td'

interface TrExpandProps {
  className?: string
  keys: string[]
  index: number
  originalRow: Data
  extraData?: ExtraTableData
  data: Data[]
}
const TrExpand: FC<TrExpandProps> = ({
  className,
  keys,
  index,
  originalRow,
  extraData,
  data,
}) => {
  const [row, setRow] = useState<{ [x: string]: any }>({})
  const [activeKey, setActiveKey] = useState<string>()
  const [expandKey, setExpandKey] = useState<string>()

  useEffect(() => {
    setRow({ ...originalRow, ...extraData })
  }, [originalRow, extraData])

  const handleSetActiveKey = (key: string, isObjectType: boolean) => {
    setActiveKey(key === activeKey ? undefined : key)
    if (isObjectType) {
      setExpandKey(key === expandKey ? undefined : key)
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
            expandKey={expandKey}
            rowIndex={index}
            row={originalRow}
            data={data}
            onCellClick={handleSetActiveKey}
          />
        ))}
      </Row>
      <RowExpand
        colSpan={keys.length}
        cellKey={expandKey}
        data={expandKey ? row[expandKey] : null}
      />
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
