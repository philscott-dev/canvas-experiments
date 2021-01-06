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
        id #Pivot UI ID
        parentId # associated Pivot UI IDs
        name # slug
        displayName # override in UI
        description # override in UI
        # position and ui data
        x
        y
        width
        height
        colorPrimary
        colorSecondary

        # new things
        # serviceId
        # routeId
        # params {
        #   type # route, service
        #   paramType # query, body, path, header, cookie
        #   id # SAM ID
        #   value # this is what the user wants every time
        # }
      }
    }
  }
`

// export const GET_SERVICE = gql`
//   query GetService($id: ID!) {
//     apimanagerService(id: $id) {
//       name
//       nameSlug
//       paramsQuery
//       paramsPath
//       paramsBody
//       paramsHeader
//       paramsCookie
//     }
//   }
// `
// export const GET_ROUTE = gql`
//   query GetRoute($id: ID!) {
//     apimanagerRoute(id: $id) {
//       name
//       nameSlug
//       method
//       route
//       paramsQuery
//       paramsPath
//       paramsBody
//       paramsHeader
//       paramsCookie
//     }
//   }
// `

export function useGetWorkflow(id: string) {
  return useQuery<GetWorkflow>(GET_WORKFLOW, {
    variables: { id: parseInt(id, 10) },
    ssr: false,
  })
}
