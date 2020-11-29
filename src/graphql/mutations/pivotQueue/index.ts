import { IDType } from 'components/PivotQueue'

export interface PivotQueueArgs {
  value: any
  parentId?: IDType
  childId?: IDType
}

export type PivotFunction = (args: PivotQueueArgs) => void

export { addPivotValue } from './addPivotValue'
export { removePivotValue } from './removePivotValue'
export { getQueuesById } from './getQueuesById'

export { removeChildQueue } from './removeChildQueue'
export { removeParentQueue } from './removeParentQueue'
