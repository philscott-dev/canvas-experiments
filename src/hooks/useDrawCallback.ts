import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import { useCallback, useEffect } from 'react'
import { Point } from '../types'
import { drawGrid, drawNode, drawPath } from 'utils/draw'
import { drawConnector } from 'utils/draw/drawConnectors'

export default function useDraw(
  ctx: CanvasRenderingContext2D | null | undefined,
  translateOffset: Point,
  scale: number,
  nodes: WorkflowNode[],
  activeId?: string,
  hoverId?: string,
  connectorDrag?: Point,
  dragId?: string,
) {
  const draw = useCallback(() => {
    if (ctx) {
      // clear, save, and transform
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.save()
      ctx.setTransform(scale, 0, 0, scale, 0, 0)

      //draw grid
      drawGrid(
        ctx,
        ctx.canvas.width / scale, //divide by scale to grow the grid
        ctx.canvas.height / scale, //divide by scale to grow the grid
        40,
        translateOffset,
        '#0253B150',
      )

      //draw nodes
      nodes.forEach((node, index) => {
        // draw each rect
        drawNode(ctx, node, translateOffset, scale, activeId, hoverId)
        drawConnector(ctx, translateOffset, node)

        const parents = nodes.filter((n) => node.parentIds.includes(n.id))
        if (parents.length) {
          for (const parent of parents) {
            drawPath(ctx, translateOffset, parent, node)
          }
        }
      })

      if (connectorDrag && dragId) {
        const node = nodes.find((n) => dragId === n.id)
        if (node) {
          drawPath(ctx, translateOffset, node, {
            ...connectorDrag,
            width: 1,
            height: 1,
          })
        }
      }

      // do the restore last
      ctx.restore()
    }
  }, [
    ctx,
    scale,
    translateOffset,
    nodes,
    activeId,
    hoverId,
    connectorDrag,
    dragId,
  ])

  useEffect(() => {
    draw()
  }, [draw])
  return draw
}
