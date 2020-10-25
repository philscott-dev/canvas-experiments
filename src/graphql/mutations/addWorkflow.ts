import { gql, useMutation } from '@apollo/client'
import { AddWorkflow, AddWorkflowVariables } from './__generated__/AddWorkflow'
import { GetAllWorkflows } from '../queries/__generated__/GetAllWorkflows'
import { GET_ALL_WORKFLOWS } from '../queries/getAllWorkflows'

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
  const [mutate, { data, error, loading }] = useMutation<
    AddWorkflow,
    AddWorkflowVariables
  >(ADD_WORKFLOW, {
    /**
     * Optimistic Updates
     * We still have to use "mutate" to update the server
     */
    update(cache, { data }) {
      const newWorkflow = data?.addWorkflow
      const existingData = cache.readQuery<GetAllWorkflows>({
        query: GET_ALL_WORKFLOWS,
      })

      console.log(existingData)

      if (newWorkflow && existingData) {
        cache.writeQuery({
          query: GET_ALL_WORKFLOWS,
          data: {
            workflows: [
              ...existingData.workflows,
              { ...newWorkflow, __typename: 'Workflow' },
            ],
          },
        })
      }
    },
  })

  return { mutate, data, error, loading }
}
