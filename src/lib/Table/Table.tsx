import React, { FC } from 'react'
import styled from '@emotion/styled'
import Tbody from './Tbody'
import Thead from './Thead'
import Th from './Th'
import Tr, { Row } from './Tr'
import useUniqueKeys from './useUniqueKeys'
import { Data, ExtraTableData } from './types'

interface TableProps {
  data: Data[]
  extraData?: ExtraTableData
  exclude?: string[]
  include?: string[]
  isScrollable?: boolean
  className?: string
}

const Table: FC<TableProps> = ({
  data,
  extraData,
  exclude,
  include,
  isScrollable,
  className,
}) => {
  const keys = useUniqueKeys({ data, extraData, include, exclude })
  return (
    <div className={className}>
      <Thead>
        <Row>
          {keys.map((key) => (
            <Th key={key} heading={key} />
          ))}
        </Row>
      </Thead>
      <Tbody isScrollable={isScrollable}>
        {data &&
          data.map((obj, index) => {
            return (
              <Tr
                key={index}
                index={index}
                keys={keys}
                originalRow={obj}
                extraData={extraData}
                data={data}
              />
            )
          })}
      </Tbody>
    </div>
  )
}

export default styled(Table)`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-radius: 2px;
  overflow: hidden;
`
