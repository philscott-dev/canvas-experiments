import { FC, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  mountId: string
}

const Portal: FC<PortalProps> = ({ children, mountId }) => {
  const elemRef = useRef<Element>()
  useEffect(() => {
    elemRef.current = document?.createElement('div')
  }, [])

  useEffect(() => {
    const elem = elemRef.current
    const portalRoot = document.getElementById(mountId)
    if (elem) {
      portalRoot?.appendChild(elem)
    }

    return () => {
      if (elem) {
        portalRoot?.removeChild(elem)
      }
    }
  })

  return elemRef.current ? createPortal(children, elemRef.current) : null
}

export default Portal
