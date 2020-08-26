/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { Header, H2, H4 } from 'components/FlowChartDataPanel'
import { Table } from 'lib'
import { mock } from './mock'
import FlowChartDataLinkSidebar from '../FlowChartDataLinkSidebar'

interface FlowChartDataPanelProps {
  className?: string
}

const FlowChartDataPanel: FC<FlowChartDataPanelProps> = ({ className }) => {
  return (
    <div className={className}>
      <Wrapper>
        <Header>
          <div>
            <H2>DYNAMIC SERVICE NAME</H2>
            <H4>SERVICE SUBTITLE</H4>
          </div>
        </Header>
        <Container>
          <Table isScrollable data={mock} />
        </Container>
      </Wrapper>
      <FlowChartDataLinkSidebar />
    </div>
  )
}

export default styled(FlowChartDataPanel)`
  display: flex;
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 24px;
`

const Container = styled.section`
  flex: 1;
  overflow: auto;
`
