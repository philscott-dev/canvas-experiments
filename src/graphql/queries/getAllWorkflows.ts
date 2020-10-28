import { gql, useQuery } from '@apollo/client'
import { GetAllWorkflows } from './__generated__/GetAllWorkflows'

export const GET_ALL_WORKFLOWS = gql`
  query GetAllWorkflows {
    workflows {
      id
      title
      description
      createdDate
      updatedDate
    }
  }
`

export function useGetAllWorkflows() {
  return useQuery<GetAllWorkflows>(GET_ALL_WORKFLOWS, {
    fetchPolicy: 'network-only',
  })
}
