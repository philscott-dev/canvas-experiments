import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import styled from '@emotion/styled'
import { useGetWorkflow } from 'graphql/queries'
import { useRef, useState, DragEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { FlowChartCanvas, FlowChartUI } from 'components'
import { Point, BaseNode, RectNode } from 'types'
import { getCanvasPoint } from 'helpers/canvas'
import { useCanvas } from 'hooks'
import { NODE_HEIGHT, NODE_WIDTH } from 'constants/constants'
import { zoom } from 'utils/zoom'
import { Portal } from 'lib'
import DeleteModal from 'lib/Modal/DeleteModal'
import { removeByIndex } from 'helpers/array'

function WorkflowPage({
  id,
  className,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { loading, data } = useGetWorkflow(id)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx } = useCanvas(canvasRef)
  const [nodes, setNodes] = useState<RectNode[]>([])
  const [node, setNode] = useState<BaseNode>() // TODO: rename this thing. dont use it for canvas interactions, it's only used for dragging DOM to canvas
  const [dragStartOffset, setDragStartOffset] = useState<Point>({ x: 0, y: 0 })
  const [translateOffset, setTranslateOffset] = useState<Point>({ x: 0, y: 0 })
  const [origin, setOrigin] = useState<Point>({ x: 0, y: 0 }) // for scale calculations
  const [scale, setScale] = useState<number>(1)
  const [activeId, setActiveId] = useState<string>()
  const [isDragging, setDragging] = useState(false)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)

  /**
   * Canvas Events
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
    if (ctx?.canvas) {
      const x = zoom(
        ctx?.canvas,
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
    if (ctx?.canvas) {
      const x = zoom(
        ctx.canvas,
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
    if (ctx?.canvas) {
      const point = getCanvasPoint(e, ctx.canvas)
      const x = point.x / scale
      const y = point.y / scale
      if (node) {
        console.log(node)
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

  /**
   * Node Controls
   */

  const handleNodePlayClick = () => {}

  const handleNodeSettingsClick = () => {}

  /**
   * Delete Node
   */

  const handleNodeTrashClick = () => {
    setDeleteModalVisible(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false)
  }

  const handleConfirmDelete = async () => {
    if (node) {
      const index = nodes.findIndex((n) => n.id === activeId)
      const array = removeByIndex(nodes, index)
      setNodes(array)
    }
    setDeleteModalVisible(false)
  }

  return (
    <div className={className}>
      <FlowChartUI
        title={data?.workflow.title ?? ''}
        onDragStart={handleDragStart}
        onCenter={handleCenter}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
      <FlowChartCanvas
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
        onNodePlayClick={handleNodePlayClick}
        onNodeSettingsClick={handleNodeSettingsClick}
        onNodeTrashClick={handleNodeTrashClick}
      />
      <Portal mountId="portal">
        <DeleteModal
          isVisible={isDeleteModalVisible}
          onClose={handleCloseDeleteModal}
          onDelete={handleConfirmDelete}
        />
      </Portal>
    </div>
  )
}

export default styled(WorkflowPage)`
  position: relative;
  height: inherit;
  min-height: inherit;
  display: flex;
`

/**
 * Server Side Props
 */

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get router ID immediately to pass to the useGetWorkflow hook
  return {
    props: {
      id: context.query.id as string,
    },
  }
}
