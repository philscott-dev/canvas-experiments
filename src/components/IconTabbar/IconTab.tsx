/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface IconTabProps {
  className?: string
  isActive?: boolean
  disabled?: boolean
}

const IconTab: FC<IconTabProps> = ({
  className,
  isActive = false,
  disabled = false,
  children,
}) => {
  return (
    <button disabled={disabled} className={className}>
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
    cursor: pointer;
  }
  &:disabled {
    > svg {
      color: ${({ theme }) => theme.color.gray[300]};
    }
    cursor: default;
  }
`

const Highlight = styled.div<IconTabProps>`
  height: 4px;
  margin-top: 4px;
  background: ${({ isActive, theme }) =>
    isActive ? theme.color.blue[300] : null};
`
