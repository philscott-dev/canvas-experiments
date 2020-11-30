import { GetWorkflow_workflow as Workflow } from '../queries/__generated__/GetWorkflow'
import { InMemoryCache } from '@apollo/client'
import { pivotQueueVar } from './pivotQueueVar'

export default new InMemoryCache({
  typePolicies: {
    UnconventionalRootQuery: {
      queryType: true,
      // fields: {
      //   workflows: {
      //     merge(
      //       existing: Workflow[] = [],
      //       incoming: Workflow[],
      //       { mergeObjects, readField },
      //     ) {
      //       console.log(existing, incoming)
      //       return incoming
      //     },
      //   },
      // },
    },
    Workflow: {
      fields: {
        workflowNodes: {
          read(existing) {
            return existing
          },
          //always take incoming - fixes delete warning
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
