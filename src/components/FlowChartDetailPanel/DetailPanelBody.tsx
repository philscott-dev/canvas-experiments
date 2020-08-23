/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC, useState, useEffect } from 'react'
import { ExpandLevel } from 'enums'
import { show } from 'keyframes/show'

interface DetailPanelBodyProps {
  className?: string
  expandLevel: ExpandLevel
  isActive: boolean
}
const DetailPanelBody: FC<DetailPanelBodyProps> = ({
  className,
  expandLevel,
  children,
  isActive,
}) => {
  //const [isVisible, setVisible] = useState(false)
  // useDelayedExpand
  // useEffect(() => {
  //   if (isActive) {
  //     const timeout = setTimeout(() => {
  //       setVisible(true)
  //     }, 250)
  //     return () => clearTimeout(timeout)
  //   } else {
  //     setVisible(false)
  //   }
  // }, [isActive])
  return (
    <Body className={className} expandLevel={expandLevel} isActive={isActive}>
      <Wrapper isVisible={false} isActive={isActive}>
        {children}
      </Wrapper>
    </Body>
  )
}

export default DetailPanelBody

interface BodyProps {
  expandLevel: ExpandLevel
  isActive: boolean
}

const Body = styled.div<BodyProps>`
  box-sizing: border-box;
  pointer-events: all;
  height: initial;
  flex: 1;
  overflow: auto;
  display: ${({ isActive }) => (isActive ? 'initial' : 'none')};
  background: ${({ theme }) => theme.color.blue[700] + 'f7'};
  max-height: ${({ expandLevel }) =>
    expandLevel !== ExpandLevel.NONE ? '100%' : 0};
  transition: all 0.25s ease-in-out;
`

const Wrapper = styled.div<{ isVisible?: boolean; isActive: boolean }>`
  height: 100%;
  display: none;
  /* animation-name: ${({ isActive }) => (isActive ? show : null)};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards; */
`
