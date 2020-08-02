/** @jsx jsx */
import {
  useState,
  forwardRef,
  WheelEvent,
  MouseEvent,
  DragEvent,
  useEffect,
} from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import useResize from './hooks/useResize'
import useDrawCallback from './hooks/useDrawCallback'
import { RectNode, Point } from './types'
import { pointInRect } from './utils/math'
import { getCanvasPoint } from './helpers/helpers'
import { zoom } from './utils/zoom'

interface CanvasProps {
  className?: string
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  nodes: RectNode[]
  activeId?: string
  translateOffset: Point
  scale: number
  origin: Point
  isDragging: boolean
  onDragging: (isDragging: boolean) => void
  onSetNodes: (nodes: RectNode[]) => void
  onDrop: (e: DragEvent) => void
  onClickNode: (id: string) => void
  onTranslate: (point: Point) => void
  onScale: (factor: number) => void
  onOrigin: (pt: Point) => void
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
      origin,
      isDragging,
      onSetNodes,
      onDrop,
      onDragging,
      onClickNode,
      onTranslate,
      onScale,
      onOrigin,
    },
    canvasRef,
  ) => {
    const [hasLoaded, setHasLoaded] = useState(false)
    const [dragId, setDragId] = useState<string>()
    const [clickOffset, setClickOffset] = useState<Point>() // probably needs renaming
    const draw = useDrawCallback(
      canvas,
      ctx,
      translateOffset,
      scale,
      nodes,
      isDragging,
      activeId,
    )
    //draw once
    useEffect(() => {
      if (canvas && !hasLoaded) {
        setHasLoaded(true)
        draw()
      }
    }, [hasLoaded, draw, canvas])
    useResize(canvas, draw)

    const onMouseDown = (
      e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    ) => {
      if (canvas) {
        const point = getCanvasPoint(e, canvas)
        const x = point.x / scale
        const y = point.y / scale
        const node = nodes.find((n) =>
          pointInRect(x - translateOffset.x, y - translateOffset.y, n.rect),
        )
        if (node && node.rect) {
          document.body.style.webkitUserSelect = 'none'
          document.body.style.userSelect = 'none'
          onDragging(true)
          setDragId(node.id)
          setClickOffset({
            x: x - node.rect.x,
            y: y - node.rect.y,
          })
          onClickNode(node.id)
        } else {
          const point = getCanvasPoint(e, canvas)
          const x = point.x / scale
          const y = point.y / scale
          onDragging(true)
          setClickOffset({ x, y })
        }
      }
    }

    const onMouseMove = (
      e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    ) => {
      if (canvas) {
        const point = getCanvasPoint(e, canvas)
        const x = point.x / scale
        const y = point.y / scale
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
      if (canvas) {
        const x = zoom(canvas, scale, origin, translateOffset, e)
        onTranslate(x.translate)
        onScale(x.factor)
        onOrigin(x.origin)
        draw()
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

export default styled(Canvas)``
