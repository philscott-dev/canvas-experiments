import { Rect } from 'types'

export function drawPathCurve(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  nextRect?: Rect,
) {
  if (nextRect) {
    const x1 = rect.x + rect.width / 2
    const y1 = rect.y + rect.height / 2
    const x2 = nextRect.x + nextRect.width / 2
    const y2 = nextRect.y + nextRect.height / 2

    ctx.beginPath()
    ctx.moveTo(x1, y1)

    // Step 1: Calculate the difference between the start and end point
    const diffX = x2 - x1
    const diffY = y2 - y1

    // Step 2: Find angle between the two points
    const angle = Math.atan2(diffY, diffX)

    // Step 3: find center of line
    const mx = x1 + diffX * 0.5
    const my = y1 + diffY * 0.5

    // Step 4: produce control point
    const radius = 150
    const cx = mx + radius * Math.sin(angle)
    const cy = my - radius * Math.cos(angle)

    ctx.quadraticCurveTo(cx, cy, x2, y2)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    ctx.closePath()
    ctx.stroke()
  }
}
