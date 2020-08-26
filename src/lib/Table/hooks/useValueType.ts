import { useState, useEffect } from 'react'
import { Data, ValueType, CellState } from '../types'
import { handleCellValue } from '../helpers/handleCellValue'

export function useValueType(
  value?: ValueType,
  row?: Data,
  data?: Data[],
  rowIndex?: number,
) {
  const [cell, setCell] = useState<CellState>({
    value: '',
    type: 'text',
  })
  useEffect(() => {
    const val = handleCellValue(value, row, data, rowIndex)
    setCell(val)
  }, [value, data, row, rowIndex])
  return cell
}
