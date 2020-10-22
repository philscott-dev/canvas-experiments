import { useCallback, useEffect } from 'react'
import { RectNode, Point } from '../types'
import { drawPathAngle, drawGrid, drawNode } from 'utils/draw'

export default function useDraw(
  ctx: CanvasRenderingContext2D | null | undefined,
  translateOffset: Point,
  scale: number,
  nodes: RectNode[],
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

        //draw paths for nodes
        const r = nodes[index + 1]?.rect

        //if nodes length
        if (nodes.length && r) {
          const rect = {
            ...node.rect,
            x: node.rect.x + translateOffset.x,
            y: node.rect.y + translateOffset.y,
          }
          const nextRect = {
            x: r.x + translateOffset.x,
            y: r.y + translateOffset.y,
            width: r.width,
            height: r.height,
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
