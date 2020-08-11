import { useState, useEffect } from 'react'
import { Data, ValueType } from './types'
import { isDate } from 'date-fns'
import {
  isBoolean,
  isNumber,
  isString,
  isObject,
  isDateString,
} from 'helpers/typecheck'

type CellState = {
  value?: string | number | boolean | JSX.Element
  type: 'text' | 'array' | 'object' | 'date'
}

export function useValueType(value?: ValueType) {
  const [cell, setCell] = useState<CellState>({
    value: '',
    type: 'text',
  })
  useEffect(() => {
    function handleValueType(val?: ValueType): CellState {
      if (Array.isArray(val)) {
        return { value: val.length, type: 'array' }
      } else if (isObject(val)) {
        return { value: 'Click for Details', type: 'object' }
      } else if (isBoolean(val)) {
        return { value: String(val), type: 'text' }
      } else if (isDateString(val)) {
        return { value: String(val), type: 'date' }
      } else if (isDate(val)) {
        return { value: String(val), type: 'date' }
      } else if (isString(value) || isNumber(value)) {
        return { value: String(val), type: 'text' }
      } else {
        return { value: '', type: 'text' }
      }
    }
    const val = handleValueType(value)
    setCell(val)
  }, [value])
  return cell
}
