import type { MouseEvent } from 'react'

export type CellData = { [key: string]: any }

export type Data = { [key: string]: any }

export interface RowData {
  row: Data
  data: Data[]
  rowIndex: number
}

export type ExtraTableData = {
  [key: string]: {
    heading: () => JSX.Element
    cell: (row: Data, index: number, data: Data[]) => JSX.Element
  }
}

export type ValueType = (
  row: Data,
  rowIndex: number,
  data: Data[],
) => JSX.Element | string | boolean | number

export type CellType = 'text' | 'array' | 'object' | 'date' | 'table' | 'jsx'

export type CellState = {
  value?: string | number | boolean | JSX.Element
  type: CellType
}

export type BreadCrumb = {
  label: string
  href?: string
}

export type CellClickFunction = (
  event: MouseEvent<HTMLButtonElement>,
  key: string,
  isExpandable: CellType,
  rowIndex: number,
  expandIndex: number,
  cellData: any,
  rowData: Data,
  tableData: Data[],
) => void

export interface TableMetaData {
  cellData: any
  rowData: any
  tableData: any
  cellIndex: number
  rowIndex: number
  tableIndex: number
}
