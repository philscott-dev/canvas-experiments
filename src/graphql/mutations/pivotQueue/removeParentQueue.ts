import { PivotFunction } from '.'
import { pivotQueueVar } from '../../cache'
import { remove } from 'helpers/array'
import { getQueuesById } from './getQueuesById'

export const removeParentQueue: PivotFunction = ({
  value,
  parentId,
  childId,
}) => {
  const queue = pivotQueueVar()
  const { parentQueue, childQueue } = getQueuesById(queue, parentId, childId)

  pivotQueueVar()
}
