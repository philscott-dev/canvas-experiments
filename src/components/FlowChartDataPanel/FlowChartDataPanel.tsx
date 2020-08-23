/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { Header, H2, H4 } from 'components/FlowChartDataPanel'
import { Table } from 'lib'
import { show } from 'keyframes/show'
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
        <Table isScrollable data={mock} />
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
  flex-grow: 1;
  padding: 0 24px;
`
