export function zoom(canvas: HTMLCanvasElement, scale: number, delta: number) {
  const intensity = 0.001
  // dont pass in translate offset, as this zoom
  // is based off of canvas position only
  // const { x, y } = getCanvasPoint(e, canvas)
  // const zoom = Math.exp(e.deltaY * intensity)
  // ctx.translate(origin.x, origin.y)
  // const factor = scale * zoom
  // const positionX = origin.x - (x / factor - x / scale)
  // const positionY = origin.y - (y / factor - y / scale)
  // ctx.scale(zoom, zoom)
  // ctx.translate(-positionX, -positionY)

  // //update state
  // onTranslate({
  //   x: origin.x + translateOffset.x - positionX,
  //   y: origin.y + translateOffset.y - positionY,
  // })
  // //set scale and fac
  // onScale(factor)
  // setOrigin({ x: positionX, y: positionY })
  return intensity
}
