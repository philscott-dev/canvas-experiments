import { useCallback, useEffect } from 'react'
import { RectNode, Point } from '../types'
import { drawPathAngle, drawGrid, drawNode } from '../utils/draw'

export default function useDraw(
  canvas: HTMLCanvasElement | null,
  ctx: CanvasRenderingContext2D | null | undefined,
  translateOffset: Point,
  scale: number,
  nodes: RectNode[],
  isDragging: boolean,
  activeId?: string,
) {
  const draw = useCallback(() => {
    if (canvas && ctx) {
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale)
      ctx.restore()

      ctx.scale(scale, scale)

      //draw grid
      drawGrid(
        ctx,
        canvas.width / scale, //divide by scale to grow the grid
        canvas.height / scale, //divide by scale to grow the grid
        40,
        translateOffset,
        '#0253B150',
      )

      //draw nodes
      nodes.forEach((node, index) => {
        // draw each rect
        drawNode(ctx, node, translateOffset, activeId)

        //draw paths for nodes
        const r = nodes[index + 1]?.rect
        if (nodes.length && r) {
          const rect = {
            ...node.rect,
            x: node.rect.x + +translateOffset.x,
            y: node.rect.y + +translateOffset.y,
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
    }
  }, [canvas, ctx, scale, translateOffset, isDragging, nodes, activeId])
  useEffect(draw)
  return draw
}
