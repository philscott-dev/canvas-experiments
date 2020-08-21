/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC, useState, useEffect } from 'react'
import { ExpandLevel } from 'enums'

interface DetailPanelBodyProps {
  className?: string
  expandLevel: ExpandLevel
  isActive: boolean
}
const DetailPanelBody: FC<DetailPanelBodyProps> = ({
  className,
  expandLevel,
  children,
}) => {
  const [isVisible, setVisible] = useState(false)
  // useDelayedExpand
  useEffect(() => {
    if (expandLevel) {
      const timeout = setTimeout(() => {
        setVisible(true)
      }, 250)
      return () => clearTimeout(timeout)
    } else {
      setVisible(false)
    }
  }, [expandLevel])
  return (
    <Body className={className} expandLevel={expandLevel}>
      {children}
    </Body>
  )
}

export default DetailPanelBody

const Body = styled.div<{ expandLevel: ExpandLevel }>`
  box-sizing: border-box;
  pointer-events: all;
  flex: ${({ expandLevel }) => expandLevel};
  background: ${({ theme }) => theme.color.blue[700] + 'f7'};
  transition: all 0.25s ease-in-out;
`

