import { Point } from 'types'

// TODO: adjust grid for scale, at step
export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  step: number,
  translateOffset: Point,
  color: string,
) {
  ctx.beginPath()
  const offsetX = translateOffset.x % step
  const offsetY = translateOffset.y % step

  //vertical lines
  for (let x = 0; x <= width + step; x += step) {
    ctx.moveTo(x + offsetX, -Math.abs(offsetY))
    ctx.lineTo(x + offsetX, height)
  }
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.beginPath()

  //horizontal lines
  for (let y = 0; y <= height + step; y += step) {
    ctx.moveTo(0, y + offsetY)
    ctx.lineTo(width, y + offsetY)
  }
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.closePath()
  ctx.stroke()
}
