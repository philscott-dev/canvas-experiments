import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import { useCallback, useEffect } from 'react'
import { Point } from '../types'
import { drawPathAngle, drawGrid, drawNode } from 'utils/draw'

export default function useDraw(
  ctx: CanvasRenderingContext2D | null | undefined,
  translateOffset: Point,
  scale: number,
  nodes: WorkflowNode[],
  activeId?: string,
) {
  const draw = useCallback(() => {
    if (ctx) {
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
        drawNode(ctx, node, translateOffset, scale, activeId)

        //draw paths for nodes, with next node
        const nextNode = nodes[index + 1]

        //if nodes length
        if (nodes.length && nextNode) {
          const rect = {
            ...node,
            x: node.x + translateOffset.x,
            y: node.y + translateOffset.y,
          }
          const nextRect = {
            x: nextNode.x + translateOffset.x,
            y: nextNode.y + translateOffset.y,
            width: nextNode.width,
            height: nextNode.height,
          }
          drawPathAngle(ctx, rect, nextRect)
        }
      })

      // do the restore last
      ctx.restore()
    }
  }, [ctx, scale, translateOffset, nodes, activeId])

  useEffect(() => {
    draw()
  }, [draw])
  return draw
}
