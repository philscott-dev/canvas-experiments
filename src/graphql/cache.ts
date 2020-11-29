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

export const pivotQueueVar = makeVar<PivotQueue>({})
