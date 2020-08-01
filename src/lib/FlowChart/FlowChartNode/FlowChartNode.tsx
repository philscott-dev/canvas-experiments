/** @jsx jsx */
import { FC, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { Text } from 'lib'
import FlowChartNodeTab from './FlowChartNodeTab'
import FlowChartNodeBody from './FlowChartNodeBody'
import FlowChartNodeText from './FlowChartNodeText'

interface FlowChartNodeProps {
  className?: string
  displayName: string
  colorPrimary: string
  colorSecondary: string
  onDragStart: (e: DragEvent<HTMLDivElement>) => void
}
const FlowChartNode: FC<FlowChartNodeProps> = ({
  className,
  displayName,
  colorPrimary,
  colorSecondary,
  onDragStart,
}) => {
  return (
    <div draggable onDragStart={onDragStart} className={className}>
      <FlowChartNodeTab color={colorPrimary} />
      <FlowChartNodeBody color={colorSecondary}>
        <FlowChartNodeText>{displayName}</FlowChartNodeText>
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
