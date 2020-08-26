import { ValueType, CellState, Data } from '../types'
import { isDate } from 'date-fns'
import {
  isBoolean,
  isFunction,
  isNumber,
  isString,
  isObject,
  isDateString,
} from 'helpers/typecheck'

export function handleCellValue(
  value?: ValueType,
  row?: Data,
  data?: Data[],
  rowIndex?: number,
): CellState {
  if (Array.isArray(value)) {
    if (value.every((val) => isObject(val))) {
      return { value: 'View Table', type: 'table' }
    } else {
      return { value: `[${value.length}] View List`, type: 'array' }
    }
  } else if (isObject(value)) {
    return { value: 'Click for Details', type: 'object' }
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
