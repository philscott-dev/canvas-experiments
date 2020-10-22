/** @jsx jsx */
import { jsx } from '@emotion/react'
import { NextPage } from 'next'
import { FlowChart } from 'components'
import { initializeApollo } from 'graphql/apolloClient'


const IndexPage: NextPage = (props) => {
  return <FlowChart />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default IndexPage
