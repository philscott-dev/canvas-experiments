export type Data = { [key: string]: any }

export interface RowData {
  row: Data
  data: Data[]
  rowIndex: number
}

export type ExtraTableData = {
  [key: string]: {
    heading?: () => JSX.Element
    cell?: (row: Data, index: number, data: Data[]) => JSX.Element
  }
}

export type ValueType = (
  row: Data,
  rowIndex: number,
  data: Data[],
) => JSX.Element | string | boolean | number

export type CellType = 'text' | 'array' | 'object' | 'date' | 'table'

export type CellState = {
  value?: string | number | boolean | JSX.Element
  type: CellType
}

export type BreadCrumb = {
  label?: string
  href?: string
}
