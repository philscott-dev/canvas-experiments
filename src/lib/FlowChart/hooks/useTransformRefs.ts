import { useEffect, useState, RefObject } from 'react'

export default function useTransformRefs(
  canvasRef: RefObject<HTMLCanvasElement>,
): { ctx: CanvasRenderingContext2D | null } {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  useEffect(() => {
    if (canvasRef?.current) {
      setCtx(canvasRef.current.getContext('2d'))
    }
  }, [canvasRef])
  return { ctx }
}
