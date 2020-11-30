import { makeVar } from '@apollo/client'

export interface PivotDataValue {
  [value: string]: any
}

export interface PivotData {
  [childId: string]: PivotData
}

export const pivotDataVar = makeVar<PivotData>({})
