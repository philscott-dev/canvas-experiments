import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import { FC, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import FlowChartNodeTab from './FlowChartNodeTab'
import FlowChartNodeBody from './FlowChartNodeBody'
import FlowChartNodeText from './FlowChartNodeText'

interface FlowChartNodeProps {
  className?: string
  node: WorkflowNode
  onDragStart: (node: WorkflowNode, e: DragEvent<HTMLDivElement>) => void
}
const FlowChartNode: FC<FlowChartNodeProps> = ({
  className,
  node,
  onDragStart,
}) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    onDragStart(node, e)
  }

  return (
    <div draggable onDragStart={handleDragStart} className={className}>
      <FlowChartNodeTab color={node.colorPrimary} />
      <FlowChartNodeBody color={node.colorSecondary}>
        <FlowChartNodeText>{node.displayName}</FlowChartNodeText>
      </FlowChartNodeBody>
    </div>
  )
}

export default styled(FlowChartNode)`
  display: flex;
  min-width: 224px;
  width: 224px;
  height: 48px;
  min-height: 48px;
  border-radius: 8px;
  background: #540087;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0;
  margin-bottom: 16px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`
