import { gql, useMutation } from '@apollo/client'
import { GET_WORKFLOW } from '../queries/getWorkflow'
import {
  GetWorkflow,
  GetWorkflowVariables,
} from 'graphql/queries/__generated__/GetWorkflow'
import {
  AddWorkflowNode,
  AddWorkflowNodeVariables,
} from './__generated__/AddWorkflowNode'

const ADD_WORKFLOW_NODE = gql`
  mutation AddWorkflowNode($workflowNodeInput: AddWorkflowNodeInput!) {
    addWorkflowNode(input: $workflowNodeInput) {
      id
      nodeId
      parentId
      name
      displayName
      description
      x
      y
      width
      height
      colorPrimary
      colorSecondary
    }
  }
`

export function useAddWorkflowNode(workflowId: string) {
  const [mutate, { data, error, loading }] = useMutation<
    AddWorkflowNode,
    AddWorkflowNodeVariables
  >(ADD_WORKFLOW_NODE, {
    update(cache, { data }) {
      const newNode = data?.addWorkflowNode
      const id = parseInt(workflowId, 10)
      const existingData = cache.readQuery<GetWorkflow, GetWorkflowVariables>({
        query: GET_WORKFLOW,
        variables: { id },
      })

      if (newNode && existingData) {
        cache.writeQuery<GetWorkflow, GetWorkflowVariables>({
          query: GET_WORKFLOW,
          variables: { id },
          data: {
            workflow: {
              ...existingData.workflow,
              workflowNodes: [
                ...existingData.workflow.workflowNodes,
                { ...newNode, __typename: 'WorkflowNode' },
              ],
            },
          },
        })
      }
    },
  })
  return { mutate, data, error, loading }
}
