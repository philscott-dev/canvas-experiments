import { makeVar } from '@apollo/client'

interface ActivePivot {
  parentId?: string
  childId?: string
  value: string
}

export const activePivotVar = makeVar<ActivePivot | undefined>(undefined)
