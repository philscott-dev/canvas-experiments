import { PivotFunction } from '.'
import { pivotQueueVar } from '../../cache'
import { remove } from 'helpers/array'
import { getQueuesById } from './getQueuesById'

export const removePivotValue: PivotFunction = ({
  value,
  parentId,
  childId,
}) => {
  const queue = pivotQueueVar()
  const { parentQueue, childQueue } = getQueuesById(queue, parentId, childId)

  if (parentId && childId && childQueue) {
    pivotQueueVar({
      ...queue,
      [parentId]: { ...parentQueue, [childId]: remove(childQueue, value) },
    })
  }
}
