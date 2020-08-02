/** @jsx jsx */
import { FC, useRef, useState, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { v4 as uuid } from 'uuid'
import Canvas from './Canvas'
import { Point, BaseNode, RectNode } from './types'
import { getCanvasPoint } from './helpers/helpers'
import useTransformRefs from './hooks/useTransformRefs'
import { NODE_HEIGHT, NODE_WIDTH } from './constants'
import { FlowChartUI } from './FlowChartUI'
import { zoom } from './utils/zoom'

interface FlowChartProps {
  className?: string
}
const FlowChart: FC<FlowChartProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx } = useTransformRefs(canvasRef)
  const [nodes, setNodes] = useState<RectNode[]>([])
  const [dragStartOffset, setDragStartOffset] = useState<Point>({ x: 0, y: 0 })
  const [translateOffset, setTranslateOffset] = useState<Point>({ x: 0, y: 0 })
  const [scale, setScale] = useState<number>(1)
  const [origin, setOrigin] = useState<Point>({ x: 0, y: 0 }) // for scale calculations
  const [node, setNode] = useState<BaseNode>()
  const [activeId, setActiveId] = useState<string>()
  const [isDragging, setDragging] = useState(false)

  /**
   * Transfer data as a placeholder in state
   * once you start dragging
   */
  const handleDragStart = (n: BaseNode, e: DragEvent<HTMLDivElement>) => {
    const elem = e.currentTarget
    const point = getCanvasPoint(e, elem)
    const x = point.x / scale
    const y = point.y / scale
    setDragging(true)
    setDragStartOffset({ x, y })
    setNode(n)
  }

  const handleTranslate = (pt: Point) => {
    setTranslateOffset(pt)
  }

  const handleScale = (factor: number) => {
    setScale(factor)
  }

  const handleOrigin = (pt: Point) => {
    setOrigin(pt)
  }

  const handleZoomIn = () => {
    if (canvasRef.current) {
      const x = zoom(
        canvasRef.current,
        scale,
        origin,
        translateOffset,
        undefined,
        'in',
      )
      setScale(x.factor)
      setTranslateOffset(x.translate)
      setOrigin(x.origin)
    }
  }

  const handleZoomOut = () => {
    if (canvasRef.current) {
      const x = zoom(
        canvasRef.current,
        scale,
        origin,
        translateOffset,
        undefined,
        'out',
      )
      setScale(x.factor)
      setTranslateOffset(x.translate)
      setOrigin(x.origin)
    }
  }

  const handleCenter = () => {
    setTranslateOffset({ x: 0, y: 0 })
    setScale(1)
  }

  const handleDropNewNode = (e: DragEvent) => {
    e.preventDefault()
    const { current: canvas } = canvasRef
    if (canvas) {
      const point = getCanvasPoint(e, canvas)
      const x = point.x / scale
      const y = point.y / scale
      if (node) {
        setNodes([
          ...nodes,
          {
            ...node,
            id: uuid(),
            rect: {
              x: x - dragStartOffset.x - translateOffset.x,
              y: y - dragStartOffset.y - translateOffset.y,
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
            },
          },
        ])
      }
      setDragging(false)
    }
  }

  const handleClickNode = (id: string) => {
    setActiveId(id)
  }

  return (
    <div className={className}>
      <FlowChartUI
        onDragStart={handleDragStart}
        onCenter={handleCenter}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
      <Canvas
        ref={canvasRef}
        canvas={canvasRef.current}
        ctx={ctx}
        translateOffset={translateOffset}
        scale={scale}
        origin={origin}
        nodes={nodes}
        activeId={activeId}
        isDragging={isDragging}
        onDragging={setDragging}
        onSetNodes={setNodes}
        onClickNode={handleClickNode}
        onDrop={handleDropNewNode}
        onTranslate={handleTranslate}
        onScale={handleScale}
        onOrigin={handleOrigin}
      />
    </div>
  )
}

export default styled(FlowChart)`
  position: relative;
  height: inherit;
  min-height: inherit;
  display: flex;
`
