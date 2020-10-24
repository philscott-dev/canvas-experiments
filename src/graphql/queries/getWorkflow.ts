import { gql, useQuery } from '@apollo/client'
import { GetWorkflow } from './__generated__/GetWorkflow'

export const GET_WORKFLOW = gql`
  query GetWorkflow($id: String!) {
    workflow(id: $id) {
      id
      title
      description
      startId
      nodes {
        id
        parentId
        title
        createdDate
        updatedDate
      }
    }
  }
`

export function useGetWorkflow() {
  const { loading, error, data } = useQuery<GetWorkflow>(GET_WORKFLOW)
}
