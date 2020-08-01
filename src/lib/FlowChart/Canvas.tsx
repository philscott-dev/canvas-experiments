/** @jsx jsx */
import { useState, forwardRef, WheelEvent, MouseEvent, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import useResize from './hooks/useResize'
import useDrawCallback from './hooks/useDrawCallback'
import { RectNode, Point } from './types'
import { pointInRect } from './utils/math'
import { getCanvasPoint } from './helpers/helpers'

interface CanvasProps {
  className?: string
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  nodes: RectNode[]
  activeId?: string
  translateOffset: Point
  scale: number
  isDragging: boolean
  onDragging: (isDragging: boolean) => void
  onSetNodes: (nodes: RectNode[]) => void
  onDrop: (e: DragEvent) => void
  onClickNode: (id: string) => void
  onTranslate: (point: Point) => void
  onScale: (factor: number) => void
}
const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  (
    {
      className,
      canvas,
      ctx,
      nodes,
      activeId,
      translateOffset,
      scale,
      isDragging,
      onSetNodes,
      onDrop,
      onDragging,
      onClickNode,
      onTranslate,
      onScale,
    },
    canvasRef,
  ) => {
    // const [dragIndex, setDragIndex] = useState<number>()
    const [dragId, setDragId] = useState<string>()
    const [clickOffset, setClickOffset] = useState<Point>() // probably needs renaming
    const [origin, setOrigin] = useState<Point>({ x: 0, y: 0 }) // for scale calculations

    const draw = useDrawCallback(
      canvas,
      ctx,
      translateOffset,
      scale,
      nodes,
      isDragging,
      activeId,
    )
    useResize(canvas, draw)

    const onMouseDown = (
      e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    ) => {
      if (canvas) {
        const { x: pX, y: pY } = getCanvasPoint(e, canvas)
        const x = pX / scale
        const y = pY / scale
        const node = nodes.find((n) =>
          pointInRect(x - translateOffset.x, y - translateOffset.y, n.rect),
        )
        if (node && node.rect) {
          document.body.style.webkitUserSelect = 'none'
          document.body.style.userSelect = 'none'
          onDragging(true)
          //setDragIndex(node.id)
          setDragId(node.id)
          setClickOffset({
            x: x - node.rect.x, // + translateOffset.x,
            y: y - node.rect.y, // + translateOffset.y,
          })
          onClickNode(node.id)
        } else {
          const { x: pX, y: pY } = getCanvasPoint(e, canvas)
          const x = pX / scale
          const y = pY / scale
          onDragging(true)
          setClickOffset({ x, y })
        }
      }
    }

    const onMouseMove = (
      e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    ) => {
      if (canvas && ctx) {
        const { x: pX, y: pY } = getCanvasPoint(e, canvas)
        const x = pX / scale
        const y = pY / scale
        // if (isDragging && dragIndex !== undefined && clickOffset) {
        if (isDragging && dragId !== undefined && clickOffset) {
          const index = nodes.findIndex((n) => n.id === dragId)
          if (index > -1) {
            const node = nodes[index]
            const { width, height } = node.rect
            const dragX = x - clickOffset.x
            const dragY = y - clickOffset.y
            const dragNode = {
              ...node,
              rect: { ...node.rect, x: dragX, y: dragY, width, height },
            }
            onSetNodes([
              ...nodes.slice(0, index),
              dragNode,
              ...nodes.slice(index + 1),
            ])
          }
        } else if (isDragging && clickOffset) {
          const dragX = x - clickOffset.x // / scale
          const dragY = y - clickOffset.y // / scale

          // do the new translate
          ctx.translate(dragX, dragY)

          //set the position
          setClickOffset({ x, y })

          //accumulate the translate
          onTranslate({
            x: translateOffset.x + dragX,
            y: translateOffset.y + dragY,
          })
        }
      }
    }

    const onMouseUp = (
      e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    ) => {
      document.body.style.webkitUserSelect = 'inherit'
      document.body.style.userSelect = 'inherit'
      onDragging(false)
      setDragId(undefined)
      setClickOffset(undefined)
    }

    const onWheel = (e: WheelEvent<HTMLCanvasElement>) => {
      if (ctx && canvas) {
        const intensity = 0.001
        // dont pass in translate offset, as this zoom
        // is based off of canvas position only
        const { x, y } = getCanvasPoint(e, canvas)
        const zoom = Math.exp(e.deltaY * intensity)
        ctx.translate(origin.x, origin.y)
        const factor = scale * zoom
        const positionX = origin.x - (x / factor - x / scale)
        const positionY = origin.y - (y / factor - y / scale)
        ctx.scale(zoom, zoom)
        ctx.translate(-positionX, -positionY)

        //update state
        onTranslate({
          x: origin.x + translateOffset.x + -positionX,
          y: origin.y + translateOffset.y + -positionY,
        })
        //set scale and fac
        onScale(factor)
        setOrigin({ x: positionX, y: positionY })
      }
    }

    return (
      <canvas
        ref={canvasRef}
        className={className}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onWheel={onWheel}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      />
    )
  },
)

export default styled(Canvas)`
  background: ${({ theme }) => theme.color.blue[700]};
`
