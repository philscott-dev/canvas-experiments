import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import { Point, Rect, RectNode, Radius } from 'types'
import { theme } from 'theme'
import { drawRoundRect } from './drawRoundRect'
import { drawControls } from './drawControls'
import { drawText } from './drawText'

export function drawNode(
  ctx: CanvasRenderingContext2D,
  node: WorkflowNode,
  translateOffset: Point,
  scale: number,
  activeId?: string,
) {
  ctx.beginPath()
  const rect = {
    x: node.x + translateOffset.x,
    y: node.y + translateOffset.y,
    width: node.width,
    height: node.height,
  }

  drawRoundRect(ctx, rect, 8, node.colorSecondary, true)

  //highlight with border
  const isActive = activeId === node.id
  if (isActive) {
    // highlight the border
    ctx.lineWidth = 5
    ctx.strokeStyle = theme.color.blue[300]
    ctx.stroke()

    // draw active node controls
    drawControls(ctx, rect, scale)
  }

  //draw inner tab
  const ACTIVE_OFFSET = 2.5
  const radius = { tl: 8, tr: 0, br: 0, bl: 8 }
  const tabRect = {
    x: node.x + translateOffset.x + (isActive ? ACTIVE_OFFSET : 0),
    y: node.y + translateOffset.y + (isActive ? ACTIVE_OFFSET : 0),
    width: 48 - (isActive ? ACTIVE_OFFSET : 0),
    height: node.height - (isActive ? ACTIVE_OFFSET * 2 : 0),
  }

  ctx.beginPath()
  drawRoundRect(ctx, tabRect, radius, node.colorPrimary)

  // draw text in nodes
  const TEXT_OFFSET_Y = 22
  const TEXT_OFFSET_X = 56
  drawText(
    ctx,
    node.displayName,
    node.x + TEXT_OFFSET_X + translateOffset.x,
    node.y + TEXT_OFFSET_Y + translateOffset.y,
    {
      color: '#ffffff',
      face: 'Poppins',
    },
  )
}
