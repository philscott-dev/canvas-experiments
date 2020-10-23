import { gql, useQuery } from '@apollo/client'
import { GetWorkflows } from './__generated__/GetWorkflows'

export const GET_WORKFLOWS = gql`
  query GetWorkflows {
    workflows {
      id
      title
      description
      createdDate
      updatedDate
    }
  }
`

export function useGetWorkflows() {
  return useQuery<GetWorkflows>(GET_WORKFLOWS)
}
