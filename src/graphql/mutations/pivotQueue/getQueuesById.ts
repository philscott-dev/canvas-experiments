import { IDType } from 'components/PivotQueue'
import { PivotQueue } from 'graphql/cache/pivotQueueVar'

export const getQueuesById = (
  queue: PivotQueue,
  parentId?: IDType,
  childId?: IDType,
) => {
  if (!parentId) {
    return {}
  }

  const parentQueue = queue[parentId] || {}

  if (!childId) {
    return { parentQueue }
  }

  const childQueue = parentQueue[childId] || []

  return {
    parentQueue,
    childQueue,
  }
}
