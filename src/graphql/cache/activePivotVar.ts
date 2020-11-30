import { makeVar } from '@apollo/client'

interface ActivePivot {
  childId: string
  value: string
}

export const activePivotVar = makeVar<ActivePivot | undefined>(undefined)
