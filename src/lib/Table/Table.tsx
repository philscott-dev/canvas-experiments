/** @jsx jsx */
import { FC, useEffect, useState } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Tbody from './Tbody'
import Thead from './Thead'
import Th from './Th'
import Tr, { Row } from './Tr'
import useUniqueKeys from './hooks/useUniqueKeys'
import TableTitlebar from './TableTitlebar/TableTitlebar'
import { get } from 'helpers/collection'
import { splitCamalized } from 'helpers/string'
import {
  BreadCrumb,
  Data,
  ExtraTableData,
  CellClickFunction,
  CellDropdown,
} from './types'

interface TableProps {
  data: Data[]
  extraData?: ExtraTableData
  exclude?: string[]
  include?: string[]
  isScrollable?: boolean
  className?: string
  title?: string
  subtitle?: string
  cellDropdown?: CellDropdown
  onCellClick?: CellClickFunction
}

const Table: FC<TableProps> = ({
  className,
  data,
  extraData,
  exclude,
  include,
  isScrollable,
  title,
  subtitle,
  cellDropdown,
  onCellClick,
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
  const handleBreadCrumbClick = (index: number) => {
    setBreadCrumbs(breadCrumbs.slice(0, index + 1))
    setTablePath(tablePath.slice(0, index + 1))
  }

  const handleLoadTable = (r: number, keys: string[], key: string) => {
    const row = String(r)
    const label = splitCamalized(key).join(' ')
    setTablePath([...tablePath, [row, ...keys, key]])
    setBreadCrumbs([...breadCrumbs, { label: `[${r}] ${label}` }])
  }

  const genrateRowKey = (index: number) => {
    const i = String(index)
    const len = breadCrumbs.length - 1
    return breadCrumbs[len]?.label + i ?? '__home' + i
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
            <Th
              key={'table__checkbox'}
              heading={'table__checkbox'}
              extraData={{
                table__checkbox: {
                  heading: () => <div></div>,
                  cell: () => <div></div>,
                },
              }}
            />
            {keys.map((key) => (
              <Th key={key} heading={key} extraData={extraData} />
            ))}
          </Row>
        </Thead>
        <Tbody isScrollable={isScrollable}>
          {tableData?.map((obj, index) => {
            return (
              <Tr
                key={genrateRowKey(index)}
                rowIndex={index}
                keys={keys}
                originalRow={obj}
                extraData={extraData}
                data={data}
                onLoadTable={handleLoadTable}
                onCellClick={onCellClick}
                cellDropdown={cellDropdown}
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
