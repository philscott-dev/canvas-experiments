import { gql, useMutation } from '@apollo/client'
import { GET_WORKFLOW } from 'graphql/queries'
import {
  GetWorkflow,
  GetWorkflowVariables,
} from 'graphql/queries/__generated__/GetWorkflow'
import {
  DeleteWorkflowNode,
  DeleteWorkflowNodeVariables,
} from './__generated__/DeleteWorkflowNode'

const DELETE_WORKFLOW_NODE = gql`
  mutation DeleteWorkflowNode($id: Float!) {
    deleteWorkflowNode(id: $id) {
      id
    }
  }
`

export function useDeleteWorkflowNode(workflowId: string) {
  const [mutate, { data, error, loading }] = useMutation<
    DeleteWorkflowNode,
    DeleteWorkflowNodeVariables
  >(DELETE_WORKFLOW_NODE, {
    update(cache, { data }) {
      const node = data?.deleteWorkflowNode
      const wfId = parseInt(workflowId, 10)

      const existingData = cache.readQuery<GetWorkflow, GetWorkflowVariables>({
        query: GET_WORKFLOW,
        variables: { id: wfId },
      })

      if (node && existingData) {
        let index = -1
        existingData.workflow.workflowNodes.find((n, i) => {
          index = i
          return n.id === node.id
        })

        cache.writeQuery({
          query: GET_WORKFLOW,
          data: {
            workflow: {
              ...existingData.workflow,
              workflowNodes: [
                ...existingData.workflow.workflowNodes.slice(0, index),
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
