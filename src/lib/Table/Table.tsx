/** @jsx jsx */
import { FC, useState } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Tbody from './Tbody'
import Thead from './Thead'
import Th from './Th'
import Tr, { Row } from './Tr'
import useUniqueKeys from './hooks/useUniqueKeys'
import { Data, ExtraTableData } from './types'
import TableTitlebar from './TableTitlebar/TableTitlebar'

interface TableProps {
  data: Data[]
  extraData?: ExtraTableData
  exclude?: string[]
  include?: string[]
  isScrollable?: boolean
  className?: string
  title?: string
  subtitle?: string
}

const Table: FC<TableProps> = ({
  data,
  extraData,
  exclude,
  include,
  isScrollable,
  title,
  subtitle,
  className,
}) => {
  const [secondaryData, setSecondaryData] = useState<Data[]>()
  const keys = useUniqueKeys({ data, extraData, include, exclude })

  const handleBreadCrumbClick = () => {}
  const handleLoadTable = () => {}

  return (
    <>
      <TableTitlebar
        title={title}
        subtitle={subtitle}
        onBreadCrumbClick={handleBreadCrumbClick}
      />
      <table className={className}>
        <Thead>
          <Row>
            {keys.map((key) => (
              <Th key={key} heading={key} />
            ))}
          </Row>
        </Thead>
        <Tbody isScrollable={isScrollable}>
          {data?.map((obj, index) => {
            return (
              <Tr
                key={index}
                index={index}
                keys={keys}
                originalRow={obj}
                extraData={extraData}
                data={data}
                onLoadTable={handleLoadTable}
              />
            )
          })}
        </Tbody>
      </table>
    </>
  )
}

export default styled(Table)`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
`
