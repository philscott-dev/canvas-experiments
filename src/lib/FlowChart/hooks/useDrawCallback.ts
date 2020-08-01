import { useCallback, useEffect } from 'react'
import { RectNode, Point } from '../types'
import { drawRoundRect, drawText, drawPathAngle, drawGrid } from '../utils/draw'

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
        const rect = {
          x: node.rect.x + translateOffset.x,
          y: node.rect.y + translateOffset.y,
          width: node.rect.width,
          height: node.rect.height,
        }
        const tabRect = {
          x: node.rect.x + translateOffset.x,
          y: node.rect.y + translateOffset.y,
          width: 48,
          height: node.rect.height,
        }
        // draw each rect
        drawRoundRect(
          ctx,
          rect,
          12,
          node.colorSecondary,
          true,
          activeId === node.id,
        )

        //draw inner tab
        drawRoundRect(
          ctx,
          tabRect,
          { tl: 8, tr: 0, br: 0, bl: 8 },
          node.colorPrimary,
          true,
        )

        //draw paths for nodes
        const r = nodes[index + 1]?.rect
        if (nodes.length && r) {
          const nextRect = {
            x: r.x + translateOffset.x,
            y: r.y + translateOffset.y,
            width: r.width,
            height: r.height,
          }
          drawPathAngle(ctx, rect, nextRect)
        }

        // draw text in nodes
        const TEXT_OFFSET_Y = 22
        const TEXT_OFFSET_X = 56
        drawText(
          ctx,
          node.displayName,
          node.rect.x + TEXT_OFFSET_X + translateOffset.x,
          node.rect.y + TEXT_OFFSET_Y + translateOffset.y,
          {
            color: '#ffffff',
            face: 'Poppins-Medium',
          },
        )
      })
    }
  }, [canvas, ctx, scale, translateOffset, isDragging, nodes, activeId])
  useEffect(draw)
  return draw
}
