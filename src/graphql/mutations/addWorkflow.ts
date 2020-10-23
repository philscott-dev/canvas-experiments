import { gql, useMutation } from '@apollo/client'
import { AddWorkflow, AddWorkflowVariables } from './__generated__/AddWorkflow'

const ADD_WORKFLOW = gql`
  mutation AddWorkflow($workflow: AddWorkflowInput!) {
    addWorkflow(workflow: $workflow) {
      id
      title
      description
      startId
      endId
    }
  }
`

export function useAddWorkflow() {
  const [mutate, { data, error }] = useMutation<
    AddWorkflow,
    AddWorkflowVariables
  >(ADD_WORKFLOW, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          workflows(existingWorkflows) {
            return {
              ...existingWorkflows,
            }
          },
        },
      })
    },
  })
}
