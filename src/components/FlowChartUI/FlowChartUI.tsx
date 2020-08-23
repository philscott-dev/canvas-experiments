/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, DragEvent, useState } from 'react'
import { jsx } from '@emotion/react'
import { FlowChartNodeMenu } from '../FlowChartNodeMenu'
import Section from './Section'
import { SidebarLeft, SidebarRight } from './Sidebar'
import { FlowChartZoomControl } from '../FlowChartZoomControl'
import { FlowChartTitleBar } from '../FlowChartTitleBar'
import { BaseNode } from '../FlowChart/types'
import { FlowChartDetailPanel } from '../FlowChartDetailPanel'
import { ExpandLevel } from 'enums'

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
  const [activePanel, setActivePanel] = useState<string>()
  const [expandLevel, setExpandLevel] = useState<ExpandLevel>(ExpandLevel.NONE)

  const handleActivePanel = (panel: string) => {
    setActivePanel(panel)
  }
  const handleExpand = (expand: ExpandLevel) => {
    setExpandLevel(expand)
  }
  return (
    <div className={className}>
      <Section expandLevel={expandLevel}>
        <SidebarLeft>
          <FlowChartNodeMenu onDragStart={onDragStart} />
        </SidebarLeft>
        <FlowChartTitleBar />
        <SidebarRight>
          <FlowChartZoomControl
            onCenter={onCenter}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
          />
        </SidebarRight>
      </Section>
      <FlowChartDetailPanel
        activePanel={activePanel}
        expandLevel={expandLevel}
        onActivePanel={handleActivePanel}
        onExpand={handleExpand}
      />
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
