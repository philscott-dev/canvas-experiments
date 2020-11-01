import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import { Point } from 'types'
import { drawArrow } from './drawArrow'
import {
  getAdapterPoint,
  getConnectorPoint,
  getConnectorRect,
} from 'utils/node'

export function drawPath(
  ctx: CanvasRenderingContext2D,
  translateOffset: Point,
  node: WorkflowNode,
  nextNode?: WorkflowNode,
) {
  const connectorPoint = getConnectorPoint(node, translateOffset)
  const connectorRect = getConnectorRect(connectorPoint)

  ctx.beginPath()
  ctx.rect(
    connectorRect.x,
    connectorRect.y,
    connectorRect.width,
    connectorRect.height,
  )
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  if (nextNode) {
    const adapter = getAdapterPoint(nextNode, translateOffset)

    ctx.beginPath()
    ctx.moveTo(connectorPoint.x, connectorPoint.y)
    ctx.lineTo(adapter.x, adapter.y)

    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    ctx.stroke()

    //no longer want arrows
    drawArrow(ctx, adapter, 'right', 12)
  }
}
