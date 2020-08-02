import { WheelEvent } from 'react'
import { getCanvasPoint, getCanvasCenter } from '../helpers/helpers'
import { Point } from '../types'

export function zoom(
  canvas: HTMLCanvasElement,
  scale: number,
  origin: Point,
  offset: Point,
  e?: WheelEvent<HTMLCanvasElement>,
  direction?: 'in' | 'out',
) {
  const intensity = 0.001
  const { x, y } = e ? getCanvasPoint(e, canvas) : getCanvasCenter(canvas)
  const delta = e ? e.deltaY : direction && direction === 'in' ? 100 : -100
  const zoom = Math.exp(delta * intensity)
  const factor = scale * zoom
  const originX = origin.x - (x / factor - x / scale)
  const originY = origin.y - (y / factor - y / scale)

  return {
    translate: {
      x: origin.x + offset.x - originX,
      y: origin.y + offset.y - originY,
    },
    origin: {
      x: originX,
      y: originY,
    },
    factor,
  }
}
