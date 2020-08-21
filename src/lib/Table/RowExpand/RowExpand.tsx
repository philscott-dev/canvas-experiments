/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { jsx } from '@emotion/react'
import get from 'lodash/get'
import RowExpandSection from './RowExpandSection'

interface RowExpandProps {
  className?: string
  data?: { [key: string]: any }
  colSpan: number
  cellKey?: string
}
const RowExpand: FC<RowExpandProps> = ({
  className,
  data,
  colSpan,
  cellKey,
}) => {
  const [expandKeys, setExpandKeys] = useState<string[]>([])

  const handleExpand = (key: string, index?: number) => {
    const expandIndex = index !== undefined && index !== null ? index + 1 : 0
    if (key === expandKeys[expandIndex]) {
      setExpandKeys([...expandKeys.slice(0, expandIndex)])
    } else {
      setExpandKeys([...expandKeys.slice(0, expandIndex), key])
    }
  }

  if (!data) return null

  return (
    <tr className={className}>
      <Cell colSpan={colSpan}>
        <RowExpandSection
          cellKey={cellKey}
          expandKey={expandKeys[0]}
          data={data}
          onExpand={handleExpand}
        />

        {expandKeys.map((expandKey, index) => (
          <RowExpandSection
            key={index}
            index={index}
            cellKey={expandKey}
            expandKey={expandKey}
            data={get(data, expandKeys.slice(0, index + 1))}
            onExpand={handleExpand}
          />
        ))}
      </Cell>
    </tr>
  )
}

export default styled(RowExpand)``

const Cell = styled.td`
  box-sizing: border-box;
  padding: 0;
`
