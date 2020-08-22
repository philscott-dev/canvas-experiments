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
  const [isVisible, setVisible] = useState(false)
  // useDelayedExpand
  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => {
        setVisible(true)
      }, 250)
      return () => clearTimeout(timeout)
    } else {
      setVisible(false)
    }
  }, [isActive])
  return (
    <Container
      className={className}
      expandLevel={expandLevel}
      isActive={isActive}
    >
      <Wrapper isVisible={isVisible} isActive={isActive}>
        {children}
      </Wrapper>
    </Container>
  )
}

export default DetailPanelBody

interface BodyProps {
  expandLevel: ExpandLevel
  isActive: boolean
}

const Container = styled.div<BodyProps>`
  box-sizing: border-box;
  pointer-events: all;
  max-height: ${({ isActive, expandLevel }) =>
    isActive && expandLevel !== ExpandLevel.NONE ? '100%' : 0};
  flex: 1;
  background: ${({ theme }) => theme.color.blue[700] + 'f7'};
  transition: all 0.25s ease-in-out;

  /* display: ${({ isActive, expandLevel }) =>
    isActive && expandLevel !== ExpandLevel.NONE ? 'initial' : 'none'}; */
`

const Wrapper = styled.div<{ isVisible: boolean; isActive: boolean }>`
  display: none;
  /* animation-name: ${({ isActive }) => (isActive ? show : null)};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards; */
`
