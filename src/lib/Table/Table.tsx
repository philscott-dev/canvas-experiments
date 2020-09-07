/** @jsx jsx */
import { FC, useEffect, useState } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Tbody from './Tbody'
import Thead from './Thead'
import Th from './Th'
import Tr, { Row } from './Tr'
import useUniqueKeys from './hooks/useUniqueKeys'
import { BreadCrumb, Data, ExtraTableData } from './types'
import TableTitlebar from './TableTitlebar/TableTitlebar'
import { get } from 'helpers/collection'
import { splitAndCapitalize, splitCamalized } from 'helpers/string'

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
  const [tablePath, setTablePath] = useState<string[][]>([])
  const [tableData, setTableData] = useState<Data[]>([])
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([])
  useEffect(() => {
    const d = get(data, tablePath.join(), data)
    setTableData(d)
  }, [data, tablePath])
  const keys = useUniqueKeys({ data: tableData, extraData, include, exclude })

  const handleBaseBreadCrumbClick = () => {
    setBreadCrumbs([])
    setTablePath([])
  }
  const handleBreadCrumbClick = () => {}
  const handleLoadTable = (r: number, keys: string[], key: string) => {
    const row = String(r)
    const label = splitCamalized(key).join(' ')
    setTablePath([...tablePath, [row, ...keys, key]])
    setBreadCrumbs([...breadCrumbs, { label: `[${r}] ${label}` }])
  }

  return (
    <>
      <TableTitlebar
        title={title}
        subtitle={subtitle}
        breadCrumbs={breadCrumbs}
        onBaseBreadCrumbClick={handleBaseBreadCrumbClick}
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
          {tableData?.map((obj, index) => {
            return (
              <Tr
                key={breadCrumbs[index]?.label ?? '__home' + String(index)}
                rowIndex={index}
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
