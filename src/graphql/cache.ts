import { GetWorkflow_workflow as Workflow } from './queries/__generated__/GetWorkflow'
import { InMemoryCache } from '@apollo/client'

export default new InMemoryCache({
  typePolicies: {
    UnconventionalRootQuery: {
      queryType: true, // makes the root cache accessible
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
          // always take incoming - fixes delete warning
          merge(_, incoming) {
            return incoming
          },
        },
      },
    },
    // Pivot: {
    //   fields: {
    //     pivotQueue: {
    //       read(x, variables) {
    //         return pivotQueueVar()
    //       },
    //     },
    //   },
    // },
  },
})
