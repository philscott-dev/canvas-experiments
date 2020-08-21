/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { Header, H2, Sidebar } from 'components/FlowChartDataPanel'
import { Table } from 'lib'
import { show } from 'keyframes/show'
import { mock } from './mock'

interface FlowChartDataPanelProps {
  className?: string
}

const FlowChartDataPanel: FC<FlowChartDataPanelProps> = ({ className }) => {
  return (
    <div className={className}>
      <Wrapper>
        <Header>
          <H2>DYNAMIC SERVICE NAME</H2>
        </Header>
        <Table data={mock} />
      </Wrapper>
      <Sidebar />
    </div>
  )
}

export default styled(FlowChartDataPanel)`
  display: flex;
  animation-name: ${show};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`

const Wrapper = styled.div`
  flex-grow: 1;
  position: relative;
  padding: 0 24px;
`
