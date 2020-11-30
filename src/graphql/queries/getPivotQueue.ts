import { useReactiveVar } from '@apollo/client'
import { pivotQueueVar } from 'graphql/cache/pivotQueueVar'

export const usePivotQueue = (
  childId?: string | null,
  parentId?: string | null,
) => {
  const queue = useReactiveVar(pivotQueueVar)
  if (parentId && childId) {
    const parentQueue = queue[parentId] || []
    return parentQueue[childId] || []
  }
  return []
}
