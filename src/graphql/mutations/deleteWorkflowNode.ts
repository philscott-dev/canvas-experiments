import { gql, useMutation } from '@apollo/client'
import { GET_WORKFLOW } from 'graphql/queries'
import {
  GetWorkflow,
  GetWorkflowVariables,
} from 'graphql/queries/__generated__/GetWorkflow'
import { find } from 'helpers/array'
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
        const workflowNodes = existingData.workflow.workflowNodes.map((n) => {
          if (n.parentId === node.id) {
            return { ...n, parentId: null }
          }
          return n
        })

        const index = find(existingData.workflow.workflowNodes, node)

        cache.writeQuery({
          query: GET_WORKFLOW,
          data: {
            workflow: {
              ...existingData.workflow,
              workflowNodes: [
                ...workflowNodes.slice(0, index),
                ...workflowNodes.slice(index + 1),
              ],
            },
          },
        })
      }
    },
  })

  return { mutate, data, error, loading }
}
