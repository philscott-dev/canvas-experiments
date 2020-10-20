import { Rect } from 'types'

export function drawControls(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  scale: number,
) {
  //play
  const PLAY_SCALE = 0.035
  ctx.translate(rect.x + 8, rect.y + rect.height + 10) //start
  ctx.scale(PLAY_SCALE, PLAY_SCALE)
  ctx.lineWidth = 1
  ctx.strokeStyle = '#fcfcfc'
  ctx.fillStyle = '#156935'
  const play =
    'M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z'
  const PLAY_SVG = new Path2D(play)

  ctx.fill(PLAY_SVG)
  ctx.setTransform(scale, 0, 0, scale, 0, 0)

  // settings
  ctx.translate(rect.x - 56 + rect.width, rect.y + rect.height + 11)
  ctx.scale(0.9, 0.9)
  ctx.lineWidth = 1
  ctx.strokeStyle = '#bbbbbb'
  ctx.fillStyle = '#bbbbbb'
  const settings =
    'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'
  const SETTINGS_SVG = new Path2D(settings)
  ctx.fill(SETTINGS_SVG)
  ctx.setTransform(scale, 0, 0, scale, 0, 0)

  // trash
  const outline =
    'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'
  const TRASH_SVG = new Path2D(outline)
  ctx.translate(rect.x + rect.width - 28, rect.y + rect.height + 11) //start
  ctx.scale(0.8, 0.8)
  ctx.lineWidth = 1
  ctx.strokeStyle = '#fcfcfc'
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
