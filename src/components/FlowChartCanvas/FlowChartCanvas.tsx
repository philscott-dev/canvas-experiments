import {
  GetWorkflow_workflow_workflowNodes,
  GetWorkflow_workflow_workflowNodes as WorkflowNode,
  GetWorkflow,
  GetWorkflowVariables,
} from 'graphql/queries/__generated__/GetWorkflow'
import { GetWorkflow_workflow as Workflow } from 'graphql/queries/__generated__/GetWorkflow'

import styled from '@emotion/styled'
import { useDrawCallback, useResize } from 'hooks'
import { Point } from 'types'
import { pointInRect } from 'utils/math'
import { zoom } from 'utils/zoom'
import { getCanvasPoint } from 'helpers/canvas'
import { useApolloClient } from '@apollo/client'
import {
  useState,
  forwardRef,
  WheelEvent,
  MouseEvent,
  DragEvent,
  useEffect,
} from 'react'
import { GET_WORKFLOW } from 'graphql/queries'

interface FlowChartCanvasProps {
  className?: string
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  workflow?: Workflow
  nodes?: WorkflowNode[]
  activeId?: string
  translateOffset: Point
  scale: number
  origin: Point
  isDragging: boolean
  onDragging: (isDragging: boolean) => void
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
      nodes = [],
      activeId,
      translateOffset,
      scale,
      origin,
      isDragging,
      workflow,
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
    const apolloClient = useApolloClient()
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
            handlePlayClick(x, y, activeNode)
            handleSettingsClick(x, y, activeNode)
            handleTrashClick(x, y, activeNode)
          }
        }
      }
    }

    const handleNodeClick = (x: number, y: number) => {
      // check if any node has been clicked
      const node = nodes.find((n) =>
        pointInRect(x - translateOffset.x, y - translateOffset.y, n),
      )
      // handle the node click
      if (node) {
        document.body.style.userSelect = 'none'
        onDragging(true)
        setDragId(node.id)
        setClickOffset({
          x: x - node.x,
          y: y - node.y,
        })
        onClickNode(node.id)
      } else {
        onDragging(true)
        setClickOffset({ x, y })
      }
    }

    const handlePlayClick = (
      x: number,
      y: number,
      workflowNode: WorkflowNode,
    ) => {
      const clickX = x - translateOffset.x
      const clickY = y - translateOffset.y
      const iconX = workflowNode.x + 8
      const iconY = workflowNode.y + workflowNode.height + 10
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

    const handleSettingsClick = (
      x: number,
      y: number,
      workflowNode: WorkflowNode,
    ) => {
      const clickX = x - translateOffset.x
      const clickY = y - translateOffset.y
      const iconX = workflowNode.x - 56 + workflowNode.width
      const iconY = workflowNode.y + workflowNode.height + 11
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

    const handleTrashClick = (
      x: number,
      y: number,
      workflowNode: WorkflowNode,
    ) => {
      const clickX = x - translateOffset.x
      const clickY = y - translateOffset.y
      const iconX = workflowNode.x + workflowNode.width - 28
      const iconY = workflowNode.y + workflowNode.height + 12
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
        // get initial data
        const point = getCanvasPoint(e, canvas)
        const x = point.x / scale
        const y = point.y / scale

        // move the node if we've clicked a node
        if (isDragging && dragId !== undefined && clickOffset) {
          const index = nodes.findIndex((n) => n.id === dragId)
          if (index > -1) {
            const node = nodes[index]
            const { width, height } = node
            const dragX = x - clickOffset.x
            const dragY = y - clickOffset.y
            const dragNode = {
              ...node,
              x: dragX,
              y: dragY,
              width,
              height,
            }

            //write to the apollo cache
            if (workflow) {
              apolloClient.cache.writeQuery<GetWorkflow, GetWorkflowVariables>({
                query: GET_WORKFLOW,
                variables: { id: parseInt(workflow.id, 10) },
                data: {
                  workflow: {
                    ...workflow,
                    workflowNodes: [
                      ...nodes.slice(0, index),
                      dragNode,
                      ...nodes.slice(index + 1),
                    ],
                  },
                },
              })
            }
          }
        }
        // otherwise move the canvas
        else if (isDragging && clickOffset) {
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

        // else we need to check for a parent connector and move the arrow
        else {
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
