// @refresh reset

import styled from '@emotion/styled'
import DeleteModal from 'lib/Modal/DeleteModal'
import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useGetWorkflow } from 'graphql/queries'
import { useRef, useState, DragEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { FlowChartCanvas, FlowChartUI } from 'components'
import { Point } from 'types'
import { getCanvasPoint } from 'helpers/canvas'
import { useCanvas } from 'hooks'
import { NODE_HEIGHT, NODE_WIDTH } from 'constants/canvas'
import { zoom } from 'utils/zoom'
import { Portal } from 'lib'
import { useAddWorkflowNode } from 'graphql/mutations/addWorkflowNode'
import { useRouter } from 'next/router'
import { useDeleteWorkflowNode } from 'graphql/mutations/deleteWorkflowNode'

function WorkflowPage({
  id,
  className,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { data } = useGetWorkflow(id)
  const { mutate: addWorkflowNode } = useAddWorkflowNode(id)
  const { mutate: deleteWorkflowNode } = useDeleteWorkflowNode(id)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx } = useCanvas(canvasRef)
  const [node, setNode] = useState<WorkflowNode>() // TODO: rename this thing. dont use it for canvas interactions, it's only used for dragging DOM to canvas
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

  const handleDragStart = (n: WorkflowNode, e: DragEvent<HTMLDivElement>) => {
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

  // APOLLO: new refactor
  const handleDropNewWorkflowNode = (e: DragEvent) => {
    e.preventDefault()
    if (ctx?.canvas) {
      const point = getCanvasPoint(e, ctx.canvas)
      const x = point.x / scale
      const y = point.y / scale
      if (node) {
        addWorkflowNode({
          variables: {
            workflowNodeInput: {
              x: x - dragStartOffset.x - translateOffset.x,
              y: y - dragStartOffset.y - translateOffset.y,
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
              workflowId: router.query.id as string,
              name: node.name,
              displayName: node.displayName,
              colorPrimary: node.colorPrimary,
              colorSecondary: node.colorSecondary,
            },
          },
        })
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
    if (activeId) {
      deleteWorkflowNode({ variables: { id: parseInt(activeId) } })
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
        nodes={data?.workflow.workflowNodes}
        workflowId={id}
        workflow={data?.workflow}
        activeId={activeId}
        isDragging={isDragging}
        onDragging={setDragging}
        onClickNode={handleClickNode}
        onDrop={handleDropNewWorkflowNode}
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
