import { gql, useMutation } from '@apollo/client'
import { GET_WORKFLOW } from 'graphql/queries'
import {
  GetWorkflow,
  GetWorkflowVariables,
} from 'graphql/queries/__generated__/GetWorkflow'
import {
  UpdateNodeParent,
  UpdateNodeParentVariables,
} from './__generated__/UpdateNodeParent'

const UPDATE_NODE_PARENT = gql`
  mutation UpdateNodeParent($input: WorkflowNodeParentInput!) {
    updateWorkflowNodeParent(input: $input) {
      id
      parentId
    }
  }
`

// still need to impliment this
export function useUpdateNodeParent(workflowId: string) {
  const [mutate, { data, error, loading }] = useMutation<
    UpdateNodeParent,
    UpdateNodeParentVariables
  >(UPDATE_NODE_PARENT, {
    update(cache, { data }) {
      const positionData = data?.updateWorkflowNodeParent
      const wfId = parseInt(workflowId, 10)

      const existingData = cache.readQuery<GetWorkflow, GetWorkflowVariables>({
        query: GET_WORKFLOW,
        variables: { id: wfId },
      })

      if (positionData && existingData) {
        const { id, parentId } = positionData
        let index = -1
        const workflowNode = existingData.workflow.workflowNodes.find(
          (n, i) => {
            index = i
            return n.id === id
          },
        )

        cache.writeQuery({
          query: GET_WORKFLOW,
          data: {
            workflow: {
              ...existingData.workflow,
              workflowNodes: [
                ...existingData.workflow.workflowNodes.slice(0, index),
                { ...workflowNode, parentId },
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
