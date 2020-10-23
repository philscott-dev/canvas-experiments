/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { FiPlus, FiX } from 'react-icons/fi'

interface GlobalButtonProps {
  className?: string
  isVisible?: boolean
  disabled?: boolean
  onMouseDown: () => void
}
const GlobalButton: FC<GlobalButtonProps> = ({
  className,
  isVisible,
  disabled,
  onMouseDown,
}) => {
  return (
    <button className={className} disabled={disabled} onMouseDown={onMouseDown}>
      {isVisible ? <FiX /> : <FiPlus />}
    </button>
  )
}

export default styled(GlobalButton)`
  z-index: 1;
  right: 48px;
  top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 24px;
  max-height: 56px;
  max-width: 56px;
  min-height: 56px;
  min-width: 56px;
  border-radius: 56px;
  border: 0;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.blue[400]};
  transition: 0.25s all ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.color.blue[300]};
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.2;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    position: fixed;
    right: 48px;
    bottom: 48px;
    top: unset;
  }
`
