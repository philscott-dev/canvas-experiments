/** @jsx jsx */
import { jsx } from '@emotion/react'
import { NextPage } from 'next'
import { FlowChart } from 'lib'
import { initializeApollo } from '../graphql/apollo/apolloClient'

const IndexPage: NextPage = (props) => {
  console.log(props)
  return <FlowChart />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  // await apolloClient.query({
  //   query: ALL_POSTS_QUERY,
  //   variables: allPostsQueryVars,
  // })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default IndexPage
