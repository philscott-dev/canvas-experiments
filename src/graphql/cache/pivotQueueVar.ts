import { makeVar } from '@apollo/client'

export interface PivotChild {
  [key: string]: any[]
}

export interface PivotQueue {
  [key: string]: PivotChild
}

export const pivotQueueVar = makeVar<PivotQueue>({})

