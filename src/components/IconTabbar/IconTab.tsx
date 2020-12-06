/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface IconTabProps {
  className?: string
  isActive?: boolean
}

const IconTab: FC<IconTabProps> = ({ className, isActive, children }) => {
  return (
    <button className={className}>
      {children}
      <Highlight isActive={isActive} />
    </button>
  )
}

export default styled(IconTab)`
  padding: 0;
  background: transparent;
  outline: none;
  border: none;
  margin-right: 24px;
  > svg {
    font-size: 24px;
    color: ${({ theme }) => theme.color.white[100]};
  }
  &:hover {
    > svg {
      color: ${({ theme }) => theme.color.blue[300]};
      transition: all 0.2s ease-in-out;
    }
  }

  cursor: pointer;
`

const Highlight = styled.div<{ isActive?: boolean }>`
  height: 4px;
  margin-top: 4px;
  background: ${({ isActive, theme }) =>
    isActive ? theme.color.blue[300] : null};
`
