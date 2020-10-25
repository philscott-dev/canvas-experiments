/** @jsx jsx */
import { jsx } from '@emotion/react'
import { NextPage } from 'next'
import { FlowChart } from 'components'
import { useGetWorkflow } from 'graphql/queries'
import { useRouter } from 'next/router'

const IndexPage: NextPage = (props) => {
  const router = useRouter()
  const { loading, data, error } = useGetWorkflow('1')
  console.log(data, error)
  return <FlowChart />
}

export default IndexPage
