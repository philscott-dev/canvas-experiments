import { ApolloLink, HttpLink } from '@apollo/client'

export default ApolloLink.from([
  new HttpLink({
    uri: 'https://nextjs-graphql-with-prisma-simple.vercel.app/api',
    credentials: 'same-origin',
  }),
])
