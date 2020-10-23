import { ApolloLink, HttpLink } from '@apollo/client'

export default ApolloLink.from([
  new HttpLink({
    uri: 'http://localhost:4000',
    credentials: 'same-origin',
  }),
])
