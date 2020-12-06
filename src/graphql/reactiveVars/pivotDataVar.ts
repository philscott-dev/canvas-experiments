import { makeVar, useReactiveVar } from '@apollo/client'
import { activePivotVar } from './activePivotVar'

export interface PivotDataValue {
  [value: string]: any
}

export interface PivotData {
  [childId: string]: PivotData
}

export const pivotDataVar = makeVar<PivotData>({})

export type FunctionType = (options: {
  value: string
  parentId: string
  childId: string
  data: any
}) => void

export const setPivotData: FunctionType = ({
  data,
  value,
  parentId,
  childId,
}) => {
  const pivotData = pivotDataVar()
  const parentData = pivotData[parentId] || {}
  const childData = parentData[childId] || {}
  pivotDataVar({
    ...pivotData,
    [parentId]: {
      ...parentData,
      [childId]: {
        ...childData,
        [value]: data,
      },
    },
  })
}

export const usePivotData = () => {
  const activePivot = useReactiveVar(activePivotVar)
  const pivotData = useReactiveVar(pivotDataVar)
  if (activePivot) {
    console.log(activePivot, pivotData)
    const { value, childId, parentId } = activePivot

    if (value && childId && parentId) {
      const parent = pivotData[parentId] || {}
      const child = parent[childId] || {}
      return child[value]
    }
  }
}
