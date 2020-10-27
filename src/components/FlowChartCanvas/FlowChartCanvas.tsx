import styled from '@emotion/styled'
import { Rect } from 'types'
import { useDrawCallback, useResize } from 'hooks'
import { RectNode, Point } from 'types'
import { pointInRect } from 'utils/math'
import { zoom } from 'utils/zoom'
import { getCanvasPoint } from 'helpers/canvas'
import { GetWorkflow_workflow_nodes } from 'graphql/queries/__generated__/GetWorkflow'
import {
  useState,
  forwardRef,
  WheelEvent,
  MouseEvent,
  DragEvent,
  useEffect,
} from 'react'

interface FlowChartCanvasProps {
  className?: string
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  nodes: RectNode[]
  workflowNodes?: GetWorkflow_workflow_nodes[]
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
  onNodePlayClick: () => void
  onNodeSettingsClick: () => void
  onNodeTrashClick: () => void
}
const FlowChartCanvas = forwardRef<HTMLCanvasElement, FlowChartCanvasProps>(
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
      workflowNodes,
      onSetNodes,
      onDrop,
      onDragging,
      onClickNode,
      onTranslate,
      onScale,
      onOrigin,
      onNodePlayClick,
      onNodeSettingsClick,
      onNodeTrashClick,
    },
    canvasRef,
  ) => {
    const [hasLoaded, setHasLoaded] = useState(false)
    const [dragId, setDragId] = useState<string>()
    const [clickOffset, setClickOffset] = useState<Point>() // probably needs renaming
    const draw = useDrawCallback(ctx, translateOffset, scale, nodes, activeId)

    //draw once
    useEffect(() => {
      if (canvas && !hasLoaded) {
        setHasLoaded(true)
        draw()
      }
    }, [hasLoaded, draw, canvas])

    //fire on window resize
    useResize(canvas, draw)

    const onMouseDown = (
      e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    ) => {
      if (canvas) {
        const point = getCanvasPoint(e, canvas)
        const x = point.x / scale
        const y = point.y / scale

        // find a node
        handleNodeClick(x, y)

        // handle any control clicks
        if (activeId) {
          const activeNode = nodes.find((n) => n.id === activeId)
          if (activeNode) {
            handlePlayClick(x, y, activeNode.rect)
            handleSettingsClick(x, y, activeNode.rect)
            handleTrashClick(x, y, activeNode.rect)
          }
        }
      }
    }

    const handleNodeClick = (x: number, y: number) => {
      // check if any node has been clicked
      const node = nodes.find((n) =>
        pointInRect(x - translateOffset.x, y - translateOffset.y, n.rect),
      )
      // handle the node click
      if (node && node.rect) {
        document.body.style.userSelect = 'none'
        onDragging(true)
        setDragId(node.id)
        setClickOffset({
          x: x - node.rect.x,
          y: y - node.rect.y,
        })
        onClickNode(node.id)
      } else {
        onDragging(true)
        setClickOffset({ x, y })
      }
    }

    const handlePlayClick = (x: number, y: number, rect: Rect) => {
      const clickX = x - translateOffset.x
      const clickY = y - translateOffset.y
      const iconX = rect.x + 8
      const iconY = rect.y + rect.height + 10
      const isClicked = pointInRect(clickX, clickY, {
        x: iconX,
        y: iconY,
        width: 18,
        height: 20,
      })
      if (isClicked) {
        onNodePlayClick()
      }
    }

    const handleSettingsClick = (x: number, y: number, rect: Rect) => {
      const clickX = x - translateOffset.x
      const clickY = y - translateOffset.y
      const iconX = rect.x - 56 + rect.width
      const iconY = rect.y + rect.height + 11
      const isClicked = pointInRect(clickX, clickY, {
        x: iconX,
        y: iconY,
        width: 18,
        height: 20,
      })
      if (isClicked) {
        onNodeSettingsClick()
      }
    }

    const handleTrashClick = (x: number, y: number, rect: Rect) => {
      const clickX = x - translateOffset.x
      const clickY = y - translateOffset.y
      const iconX = rect.x + rect.width - 28
      const iconY = rect.y + rect.height + 12
      const isClicked = pointInRect(clickX, clickY, {
        x: iconX,
        y: iconY,
        width: 18,
        height: 20,
      })
      if (isClicked) {
        onNodeTrashClick()
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

export default styled(FlowChartCanvas)``
