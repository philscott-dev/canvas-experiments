import { Rect } from 'types'

export function drawControls(ctx: CanvasRenderingContext2D, rect: Rect) {
  const img = new Image()

  ctx.beginPath()
  img.onload = () => {
    ctx.moveTo(rect.x, rect.y)

    console.log('clearimage')
    ctx.drawImage(
      img,
      rect.x + rect.width - 24,
      rect.y + rect.height + 8,
      16,
      16,
    )
  }

  ctx.closePath()
  img.src = '/trash2.svg'

  // const heartSVG =
  //   'M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z'
  // const SVG_PATH = new Path2D(heartSVG)
  // ctx.beginPath()
  // ctx.moveTo(rect.x, rect.y)
  // ctx.translate(rect.x + rect.width - 24, rect.y + rect.height + 8)
  // ctx.closePath()

  // ctx.fill(SVG_PATH)
}
