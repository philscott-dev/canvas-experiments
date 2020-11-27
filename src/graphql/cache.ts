import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'
import { GetWorkflow_workflow as Workflow } from './queries/__generated__/GetWorkflow'

export default new InMemoryCache({
  typePolicies: {
    // UnconventionalRootQuery: {
    //   queryType: true,
    //   fields: {
    //     workflows: {
    //       merge(
    //         existing: Workflow[] = [],
    //         incoming: Workflow[],
    //         { mergeObjects, readField },
    //       ) {
    //         console.log(existing, incoming)
    //         return incoming
    //       },
    //     },
    //   },
    // },
    UnconventionalRootQuery: {
      queryType: true,
    },
    Workflow: {
      fields: {
        workflowNodes: {
          read(existing) {
            return existing
          },
          merge(_, incoming) {
            return incoming
          },
        },
      },
    },
    Pivot: {
      fields: {
        pivotQueue: {
          read(x, variables) {
            return pivotQueueVar()
          },
        },
      },
    },
  },
})

export interface PivotChild {
  [key: string]: any[]
}

export interface PivotQueue {
  [key: string]: PivotChild
}

const pivotQueue: PivotQueue = {
  parent1: {
    child1: [1, 2, 3, 4],
    child2: [1, 2, 3, 4],
  },
  parent2: {
    child1: ['2', '4'],
  },
}

export const pivotQueueVar = makeVar<PivotQueue>({})
