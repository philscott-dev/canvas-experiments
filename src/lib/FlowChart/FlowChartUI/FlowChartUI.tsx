/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import { FlowChartNodeMenu } from '../FlowChartNodeMenu'
import Section from './Section'
import { SidebarLeft, SidebarRight } from './Sidebar'
import TitleBar from './TitleBar'
import { FlowChartZoomControl } from '../FlowChartZoomControl'
import { FlowChartTitleBar } from '../FlowChartTitleBar'
import { FlowChartDetailPanel } from '../FlowChartDetailPanel'
import { BaseNode } from '../types'

interface FlowChartUIProps {
  className?: string
  onCenter: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onDragStart: (node: BaseNode, e: DragEvent<HTMLDivElement>) => void
}
const FlowChartUI: FC<FlowChartUIProps> = ({
  className,
  onCenter,
  onZoomIn,
  onZoomOut,
  onDragStart,
}) => {
  return (
    <div className={className}>
      <Section>
        <SidebarLeft>
          <FlowChartNodeMenu onDragStart={onDragStart} />
        </SidebarLeft>
        <TitleBar>
          <FlowChartTitleBar />
        </TitleBar>
        <SidebarRight>
          <FlowChartZoomControl
            onCenter={onCenter}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
          />
        </SidebarRight>
      </Section>
      <Detail>
        <FlowChartDetailPanel />
      </Detail>
    </div>
  )
}

export default styled(FlowChartUI)`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Detail = styled.section`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`
