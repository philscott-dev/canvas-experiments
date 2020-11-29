export { default as PivotQueue } from './PivotQueue'

export type IDType = string | null
export type QueueFunctionType = (
  value: any,
  parentId?: IDType,
  childId?: IDType,
) => void
