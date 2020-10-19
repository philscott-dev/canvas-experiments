import { Rect } from 'types'
import { drawArrow } from './drawArrow'

export function drawPathAngle(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  nextRect?: Rect,
) {
  if (nextRect) {
    const wr1 = rect.width / 2
    const hr1 = rect.height / 2
    const x1 = rect.x + wr1
    const y1 = rect.y + hr1

    const wr2 = nextRect.width / 2
    const hr2 = nextRect.height / 2
    const x2 = nextRect.x //+ wr2
    const y2 = nextRect.y //+ hr2

    let start = { x: 0, y: 0 }
    let end = { x: 0, y: 0 }
    let angle = { x: 0, y: 0 }
    //x2, y1 over, then down
    //x1, y2 down, then over

    // const isUnder =
    //   distance({ x: x1, y: y1 }, { x: x1, y: y2 }) >
    //   distance({ x: x1, y: y1 }, { x: x2, y: y1 })
    // const isLeft = x1 > x2

    ctx.beginPath()

    // if (isUnder) {
    //   //set start point
    //   start.x = x1
    //   start.y = y1 + hr1

    //   end.x = x2
    //   end.y = y2 - hr2
    // } else if (isLeft) {
    //   //set start point
    //   start.x = rect.x
    //   start.y = y1

    //   end.x = x2
    //   end.y = y2 - hr2
    // } else {
    //set start point
    start.x = rect.x + rect.width
    start.y = y1

    end.x = x2
    end.y = y2 + hr2

    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)

    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    ctx.stroke()
    //ctx.closePath()

    //draw the white square connector
    const RECT_SIZE = 7
    ctx.rect(
      start.x - RECT_SIZE / 2,
      start.y - RECT_SIZE / 2,
      RECT_SIZE,
      RECT_SIZE,
    )
    ctx.fillStyle = '#ffffff'
    ctx.fill()

    //no longer want arrows
    drawArrow(ctx, end, 'right', 10)
  }
}
