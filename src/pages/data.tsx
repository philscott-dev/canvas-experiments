/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { NextPage } from 'next'
import { initializeApollo } from 'graphql/apolloClient'
import { Header, H2, Sidebar } from 'components/FlowChartDataPanel'
import { FlowChartTitleBar } from 'components/FlowChartTitleBar'

const DataPage: NextPage = (props) => {
  return (
    <>
      <Page>
        <Wrapper>
          <FlowChartTitleBar />
          <Header>
            <H2>DYNAMIC SERVICE NAME</H2>
          </Header>
        </Wrapper>
        <Sidebar />
      </Page>
    </>
  )
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

export default DataPage

const Page = styled.div`
  display: flex;
`

const Wrapper = styled.div`
  flex-grow: 1;
  position: relative;
  padding: 24px;
`
