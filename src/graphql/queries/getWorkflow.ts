import { gql, useQuery } from '@apollo/client'
import { GetWorkflow } from './__generated__/GetWorkflow'

export const GET_WORKFLOW = gql`
  query GetWorkflow($id: Float!) {
    workflow(id: $id) {
      id
      title
      description
      startId
      workflowNodes {
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
  }
`

export function useGetWorkflow(id: string) {
  return useQuery<GetWorkflow>(GET_WORKFLOW, {
    variables: { id: parseInt(id, 10) },
    ssr: false,
  })
}
