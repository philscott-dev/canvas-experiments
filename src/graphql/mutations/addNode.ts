import { gql, useMutation } from '@apollo/client'
import {
  GetWorkflow,
  GetWorkflowVariables,
} from 'graphql/queries/__generated__/GetWorkflow'
import { GET_WORKFLOW } from '../queries/getWorkflow'
import { AddNode, AddNodeVariables } from './__generated__/AddNode'

const ADD_NODE = gql`
  mutation AddNode($nodeInput: AddNodeInput!) {
    addNode(node: $nodeInput) {
      id
      nodes {
        id
      }
    }
  }
`

export function useAddNode() {
  const [mutate, { data, error, loading }] = useMutation<
    AddNode,
    AddNodeVariables
  >(ADD_NODE, {
    update(cache, { data }) {
      const newNode = data?.addNode

      const existingData = cache.readQuery<GetWorkflow, GetWorkflowVariables>({
        query: GET_WORKFLOW,
        variables: { id: '1' },
      })
    },
  })
  return { mutate, data, error, loading }
}
