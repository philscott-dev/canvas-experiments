import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { FC, DragEvent, useState, useMemo } from 'react'
import { FlowChartNodeMenu } from '../FlowChartNodeMenu'
import Section from './Section'
import { SidebarLeft, SidebarRight } from './Sidebar'
import { FlowChartZoomControl } from '../FlowChartZoomControl'
import { FlowChartTitleBar } from '../FlowChartTitleBar'
import { FlowChartDetailPanel } from '../FlowChartDetailPanel'
import { ExpandLevel } from 'enums'

interface FlowChartUIProps {
  className?: string
  title: string
  activeId?: string
  nodes?: WorkflowNode[]
  onCenter: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onDragStart: (node: WorkflowNode, e: DragEvent<HTMLDivElement>) => void
}
const FlowChartUI: FC<FlowChartUIProps> = ({
  className,
  title,
  activeId,
  nodes,
  onCenter,
  onZoomIn,
  onZoomOut,
  onDragStart,
}) => {
  const [activePanel, setActivePanel] = useState<string>()
  const [expandLevel, setExpandLevel] = useState<ExpandLevel>(ExpandLevel.NONE)
  const workflowNode = useMemo(
    () => nodes?.find((node) => node.id === activeId),
    [nodes, activeId],
  )

  const handleActivePanel = (panel: string) => {
    setActivePanel(panel)
  }
  const handleExpand = (expand: ExpandLevel) => {
    setExpandLevel(expand)
  }

  return (
    <div className={className}>
      {/* Upper Section Canvas Controls */}
      <Section expandLevel={expandLevel}>
        <SidebarLeft>
          <FlowChartNodeMenu onDragStart={onDragStart} />
        </SidebarLeft>
        <FlowChartTitleBar title={title} />
        <SidebarRight>
          <FlowChartZoomControl
            onCenter={onCenter}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
          />
        </SidebarRight>
      </Section>

      {/* Lower Section Expansion Panel */}
      <FlowChartDetailPanel
        activePanel={activePanel}
        expandLevel={expandLevel}
        onActivePanel={handleActivePanel}
        onExpand={handleExpand}
        workflowNode={workflowNode}
        nodes={nodes}
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
