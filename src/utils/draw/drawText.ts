interface TextOptions {
  size?: number
  face?: string
  color?: string
  align?: 'left' | 'right' | 'center'
}
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  { size, face, color, align }: TextOptions,
) {
  ctx.font = `${size || 12}px ${face || 'Arial'}`
  if (align) ctx.textAlign = align
  if (color) ctx.fillStyle = color
  ctx.fillText(text.toUpperCase(), x, y)
}
