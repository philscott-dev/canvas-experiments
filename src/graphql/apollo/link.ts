import { ApolloLink, HttpLink } from '@apollo/client'

export default ApolloLink.from([
  new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
    credentials: 'same-origin',
  }),
])
