import { useEffect, useState, RefObject } from 'react'

export default function useCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
): { ctx: CanvasRenderingContext2D | null } {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  useEffect(() => {
    const canvas = canvasRef?.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const parent = canvas.parentElement
      ctx.canvas.width = parent?.clientWidth ?? 0
      ctx.canvas.height = parent?.clientHeight ?? 0
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      setCtx(ctx)
    }
  }, [canvasRef])
  return { ctx }
}
