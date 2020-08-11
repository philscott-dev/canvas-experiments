/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { NextPage } from 'next'
import { initializeApollo } from 'graphql/apollo/apolloClient'
import Grid from 'components/Grid'
import { Header, H2, Sidebar } from 'components/FlowChartDataUI'
import { FlowChartTitleBar } from 'components/FlowChartTitleBar'
import { Table } from 'lib'

const DataPage: NextPage = (props) => {
  return (
    <>
      <Page>
        <Wrapper>
          <FlowChartTitleBar />
          <Header>
            <H2>DYNAMIC SERVICE NAME</H2>
          </Header>
          <Table data={mock} />
        </Wrapper>
        <Sidebar />
      </Page>
      <Grid />
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

const mock = [
  {
    name: 'Phil Scott',
    date: '1/2/3',
    keyCount: 321,
    url: 'https://philscott.io',
    dollarAmount: '$123,456,789',
    ipAddress: '213.443.213.123',
    near: [
      {
        name: 'Park Road Shopping Center',
        distance: '1 mile',
      },
      {
        name: 'Montford',
        distance: '2 miles',
      },
    ],
    homeDetails: {
      street: 'Paddock Cir',
      city: 'Charlotte',
      state: 'NC',
      secondaryInformation: {
        sqareFt: 245,
        heat: 'gas',
      },
      near: [
        {
          name: 'Park Road Shopping Center',
          distance: '1 mile',
        },
        {
          name: 'Montford',
          distance: '2 miles',
        },
      ],
    },
    listOfPets: ['Tank', 'Merm', 'Stripes', 'Sasha', 'Jessica'],
  },
  {
    name: 'Phil Scott',
    date: '1/2/3',
    keyCount: 321,
    url: 'https://philscott.io',
    dollarAmount: '$123,456,789',
    ipAddress: '213.443.213.123',
    near: [
      {
        name: 'Park Road Shopping Center',
        distance: '1 mile',
      },
      {
        name: 'Montford',
        distance: '2 miles',
      },
    ],
    homeDetails: {
      street: 'Paddock Cir',
      city: 'Charlotte',
      state: 'NC',
      secondaryInformation: {
        sqareFt: 245,
        heat: 'gas',
      },
      near: [
        {
          name: 'Park Road Shopping Center',
          distance: '1 mile',
        },
        {
          name: 'Montford',
          distance: '2 miles',
        },
      ],
    },
    listOfPets: ['Tank', 'Merm', 'Stripes', 'Sasha', 'Jessica'],
  },
  {
    name: 'Phil Scott',
    date: '1/2/3',
    keyCount: 321,
    url: 'https://philscott.io',
    dollarAmount: '$123,456,789',
    ipAddress: '213.443.213.123',
    near: [
      {
        name: 'Park Road Shopping Center',
        distance: '1 mile',
      },
      {
        name: 'Montford',
        distance: '2 miles',
      },
    ],
    homeDetails: {
      street: 'Paddock Cir',
      city: 'Charlotte',
      state: 'NC',
      secondaryInformation: {
        sqareFt: 245,
        heat: 'gas',
      },
      near: [
        {
          name: 'Park Road Shopping Center',
          distance: '1 mile',
        },
        {
          name: 'Montford',
          distance: '2 miles',
        },
      ],
    },
    listOfPets: ['Tank', 'Merm', 'Stripes', 'Sasha', 'Jessica'],
  },
]
