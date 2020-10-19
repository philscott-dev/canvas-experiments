import { MouseEvent, DragEvent } from 'react'
import { Point } from 'types/index.d'

export const getCanvasPoint = (
  event:
    | MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
    | globalThis.MouseEvent
    | DragEvent,
  elem: HTMLElement,
) => {
  const boundingRect = elem.getBoundingClientRect()
  const x = event.clientX - boundingRect.left
  const y = event.clientY - boundingRect.top
  return { x, y }
}

export const getCanvasCenter = (elem: HTMLCanvasElement) => {
  const boundingRect = elem.getBoundingClientRect()
  const x = boundingRect.width / 2
  const y = boundingRect.height / 2
  return { x, y }
}
