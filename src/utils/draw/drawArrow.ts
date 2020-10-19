import { Point } from 'types'

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  { x, y }: Point,
  direction: 'left' | 'right' | 'down' | 'up',
  size: number = 10,
) {
  //ctx.beginPath()
  ctx.moveTo(x, y)
  const offset = size / 2

  if (direction === 'right') {
    ctx.lineTo(x - offset, y - offset)
    ctx.lineTo(x - offset, y + offset)
  }
  if (direction === 'left') {
    ctx.lineTo(x + offset, y - offset)
    ctx.lineTo(x + offset, y + offset)
  }
  if (direction === 'down') {
    ctx.lineTo(x + offset, y - offset)
    ctx.lineTo(x - offset, y - offset)
  }
  if (direction === 'up') {
    ctx.lineTo(x + offset, y + offset)
    ctx.lineTo(x - offset, y + offset)
  }

  //ctx.closePath()
  ctx.fillStyle = '#ffffff'
  ctx.fill()
}
