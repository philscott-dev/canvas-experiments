/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'

interface DetailPanelProps {
  className?: string
  isActive: boolean
}
const DetailPanel: FC<DetailPanelProps> = ({
  className,
  children,
  isActive,
}) => {
  return (
    <Wrapper className={className} isActive={isActive}>
      {children}
    </Wrapper>
  )
}

export default DetailPanel

const Wrapper = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  height: 100%;
`
