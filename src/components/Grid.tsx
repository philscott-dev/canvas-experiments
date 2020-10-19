/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState, useEffect, useRef, useCallback } from 'react'
import { jsx } from '@emotion/react'
import { useResize, useContextRef } from './FlowChart/hooks'
import { drawGrid } from '../utils/draw'

interface GridProps {
  className?: string
}
const Grid: FC<GridProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx } = useContextRef(canvasRef)
  const [hasLoaded, setHasLoaded] = useState(false)
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas && ctx) {
      const parent = canvas.parentElement
      canvas.width = parent?.clientWidth ?? 0
      canvas.height = parent?.clientHeight ?? 0

      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, 1, 1)
      ctx.restore()

      //draw grid
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        40,
        { x: 0, y: 0 },
        '#0253B130',
      )
    }
  }, [ctx, canvasRef])
  useEffect(() => {
    draw()
  }, [draw])
  //draw once
  useEffect(() => {
    if (canvasRef && !hasLoaded) {
      setHasLoaded(true)
      draw()
    }
  }, [hasLoaded, draw, canvasRef])
  useResize(canvasRef.current, draw)
  return <canvas ref={canvasRef} className={className} />
}

export default styled(Grid)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
`
