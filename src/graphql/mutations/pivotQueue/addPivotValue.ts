import { pivotQueueVar } from '../../cache'
import { PivotFunction } from '.'
import { getQueuesById } from './getQueuesById'

export const addPivotValue: PivotFunction = ({ value, parentId, childId }) => {
  const queue = pivotQueueVar()
  const { parentQueue, childQueue } = getQueuesById(queue, parentId, childId)

  // dont allow duplicates to be added to the queue
  if (parentId && childId && childQueue && childQueue?.indexOf(value) < 0) {
    pivotQueueVar({
      ...queue,
      [parentId]: { ...parentQueue, [childId]: [...childQueue, value] },
    })
  }
}
