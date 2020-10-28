import { gql, useMutation } from '@apollo/client'
import { GET_ALL_WORKFLOWS } from '../queries/getAllWorkflows'
import {
  UpdateNodePosition,
  UpdateNodePositionVariables,
} from './__generated__/UpdateNodePosition'
import {
  GetWorkflow,
  GetWorkflowVariables,
} from 'graphql/queries/__generated__/GetWorkflow'
import { GET_WORKFLOW } from 'graphql/queries'

const UPDATE_NODE_POSITION = gql`
  mutation UpdateNodePosition($input: WorkflowNodePositionInput!) {
    updateWorkflowNodePosition(input: $input) {
      id
      x
      y
    }
  }
`

// still need to impliment this
export function useUpdateNodePosition(workflowId: string) {
  const [mutate, { data, error, loading }] = useMutation<
    UpdateNodePosition,
    UpdateNodePositionVariables
  >(UPDATE_NODE_POSITION, {
    update(cache, { data }) {
      const positionData = data?.updateWorkflowNodePosition // only contains id, x, y
      const wfId = parseInt(workflowId, 10)

      const existingData = cache.readQuery<GetWorkflow, GetWorkflowVariables>({
        query: GET_WORKFLOW,
        variables: { id: wfId },
      })

      if (positionData && existingData) {
        const { id, x, y } = positionData
        let index = -1
        const workflowNode = existingData.workflow.workflowNodes.find(
          (n, i) => {
            index = i
            return n.id === id
          },
        )

        cache.writeQuery({
          query: GET_ALL_WORKFLOWS,
          data: {
            workflow: {
              ...existingData.workflow,
              workflowNodes: [
                ...existingData.workflow.workflowNodes.slice(0, index),
                { ...workflowNode, x, y },
                ...existingData.workflow.workflowNodes.slice(index + 1),
              ],
            },
          },
        })
      }
    },
  })

  return { mutate, data, error, loading }
}
