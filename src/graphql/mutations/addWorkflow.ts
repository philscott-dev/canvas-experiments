import { gql, useMutation } from '@apollo/client'
import { AddWorkflow, AddWorkflowVariables } from './__generated__/AddWorkflow'
import { GetAllWorkflows } from '../queries/__generated__/GetAllWorkflows'
import { GET_ALL_WORKFLOWS } from '../queries/getAllWorkflows'

const ADD_WORKFLOW = gql`
  mutation AddWorkflow($input: AddWorkflowInput!) {
    addWorkflow(input: $input) {
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
    update(cache, { data }) {
      const addWorkflow = data?.addWorkflow
      cache.modify({
        fields: {
          workflows(existingWorkflowRefs = []) {
            const newWorkflowRef = cache.writeFragment({
              data: addWorkflow,
              fragment: gql`
                fragment NewWorkflow on Workflow {
                  id
                  title
                  description
                  startId
                  endId
                }
              `,
            })
            return [...existingWorkflowRefs, newWorkflowRef]
          },
        },
      })
    },
  })

  return { mutate, data, error, loading }
}
