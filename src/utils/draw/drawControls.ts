import { Rect } from 'types'

export function drawControls(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  scale: number,
) {
  const outline =
    'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'

  const TRASH_SVG = new Path2D(outline)

  // trash
  ctx.translate(rect.x, rect.y - 28) //start
  ctx.lineWidth = 1
  ctx.strokeStyle = '#ffffff'
  ctx.moveTo(3, 6)
  ctx.lineTo(6, 6)
  ctx.lineTo(21, 6)
  ctx.stroke(TRASH_SVG)
  ctx.moveTo(10, 11)
  ctx.lineTo(10, 17)
  ctx.moveTo(14, 11)
  ctx.lineTo(14, 17)
  ctx.stroke()

  // SUPER IMPORTANT - After a translate,
  // always reset your transform to the identity matrix
  ctx.setTransform(scale, 0, 0, scale, 0, 0)
}
