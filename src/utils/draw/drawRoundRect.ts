import { Rect, Radius } from 'types'

export function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  { x, y, width, height }: Rect,
  borderRadius: Radius | number,
  fillStyle: string,
  showShadow: boolean = false,
) {
  // if (typeof stroke === 'undefined') {
  //   stroke = true
  // }
  if (typeof borderRadius === 'undefined') {
    borderRadius = 3
  }
  if (typeof borderRadius === 'number') {
    borderRadius = {
      tl: borderRadius,
      tr: borderRadius,
      br: borderRadius,
      bl: borderRadius,
    }
  } else {
    let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
    borderRadius.bl = borderRadius.bl || defaultRadius.bl
    borderRadius.br = borderRadius.br || defaultRadius.br
    borderRadius.tl = borderRadius.tl || defaultRadius.tl
    borderRadius.tr = borderRadius.tr || defaultRadius.tr
  }

  if (showShadow) {
    ctx.shadowColor = '#00000040'
    ctx.shadowBlur = 30
    ctx.shadowOffsetX = 16
    ctx.shadowOffsetY = 16
  }

  ctx.fillStyle = fillStyle

  ctx.moveTo(x + borderRadius.tl, y)
  ctx.lineTo(x + width - borderRadius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius.tr)
  ctx.lineTo(x + width, y + height - borderRadius.br)
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - borderRadius.br,
    y + height,
  )
  ctx.lineTo(x + borderRadius.bl, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius.bl)
  ctx.lineTo(x, y + borderRadius.tl)
  ctx.quadraticCurveTo(x, y, x + borderRadius.tl, y)

  ctx.fill()
}
