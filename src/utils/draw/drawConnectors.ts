import { Point, Rect } from 'types'
import { getConnectorPoint, getConnectorRect } from 'utils/node'

export function drawConnector(
  ctx: CanvasRenderingContext2D,
  translateOffset: Point,
  node: Rect,
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
}
