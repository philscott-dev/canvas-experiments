import { PivotFunction } from '.'
import { pivotQueueVar } from 'graphql/cache/pivotQueueVar'
import { remove } from 'helpers/array'
import { getQueuesById } from './getQueuesById'

export const removeChildQueue: PivotFunction = ({
  value,
  parentId,
  childId,
}) => {
  const queue = pivotQueueVar()
  const { parentQueue, childQueue } = getQueuesById(queue, parentId, childId)

  pivotQueueVar()
}
