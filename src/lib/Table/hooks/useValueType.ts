import { useState, useEffect, isValidElement } from 'react'
import { ValueType, CellState, Data, ExtraTableData } from '../types'
import { isDate, isValid } from 'date-fns'
import {
  isBoolean,
  isFunction,
  isNumber,
  isString,
  isObject,
  isDateString,
} from 'helpers/typecheck'

export function useValueType(
  rowIndex: number,
  cellKey: string,
  row: Data,
  data?: Data[],
  extraData?: ExtraTableData,
) {
  const [cell, setCell] = useState<CellState>({
    value: '',
    type: 'text',
  })
  useEffect(() => {
    function handleCellValue(): CellState {
      const value = row ? row[cellKey] : null
      const extraValue = extraData ? extraData[cellKey] : null

      if (extraValue && data) {
        const val = extraValue.cell(row, rowIndex, data)
        if (isValidElement(val)) {
          return { value: val, type: 'jsx' }
        } else {
          // placeholder for handling the rest of the data tree
          // need to change the returnType of .cell
          // and refactor to allow for more types than (row, index, data) => JSX.Element
          return { value: val, type: 'jsx' }
        }
      } else if (Array.isArray(value)) {
        if (value.every((val) => isObject(val))) {
          return { value: 'View Table', type: 'table' }
        } else {
          return { value: `[ ${value.length} ] View List`, type: 'array' }
        }
      } else if (isObject(value)) {
        return { value: 'View Details', type: 'object' }
      } else if (isBoolean(value)) {
        return { value: String(value), type: 'text' }
      } else if (isDateString(value)) {
        return { value: String(value), type: 'date' }
      } else if (isDate(value)) {
        return { value: String(value), type: 'date' }
      } else if (row && rowIndex && data && isFunction(value)) {
        return {
          value: value(row, rowIndex, data),
          type: 'text',
        }
      } else if (isString(value) || isNumber(value)) {
        return { value: String(value), type: 'text' }
      } else {
        return { value: '', type: 'text' }
      }
    }

    const val = handleCellValue()
    setCell(val)
  }, [data, row, rowIndex, extraData, cellKey])
  return cell
}
