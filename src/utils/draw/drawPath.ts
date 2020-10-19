import { Rect } from 'types'

export function drawPath(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  nextRect?: Rect,
) {
  if (nextRect) {
    ctx.beginPath()
    ctx.moveTo(rect.x + rect.width / 2, rect.y + rect.height / 2)
    ctx.lineTo(
      nextRect.x + nextRect.width / 2,
      nextRect.y + nextRect.height / 2,
    )
    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    ctx.closePath()
    ctx.stroke()
  }
}
