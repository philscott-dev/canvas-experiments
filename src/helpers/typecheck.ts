import { parseISO } from 'date-fns'
import { isDate } from 'lodash'

export function isDateString(x: any) {
  if (isDate(x)) {
    return false
  }
  const date = parseISO(x)
  return date instanceof Date && !isNaN(date.getTime())
}

export function isNumber(x: any): x is number {
  return typeof x === 'number'
}

export function isString(x: any): x is string {
  return typeof x === 'string'
}

export function isBoolean(x: any): x is boolean {
  return typeof x === 'boolean'
}

export function isFunction(x: any): x is Function {
  return x instanceof Function
}

export function isObject(x: any) {
  return !!x && !Array.isArray(x) && x.constructor === Object
}
