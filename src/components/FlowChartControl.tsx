/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface FlowChartControlProps {
  className?: string
  value: string
  isActive?: boolean
  onClick: (value?: string) => void
}
const FlowChartControl: FC<FlowChartControlProps> = ({
  className,
  children,
  value,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    if (value && onClick) {
      onClick(value)
    }
  }
  return (
    <Control
      type="button"
      className={className}
      isActive={isActive}
      onMouseDown={handleClick}
    >
      {children}
    </Control>
  )
}

export default FlowChartControl

const Control = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-right: 0;
  border-left: 0;
  border-top: 0;
  border-bottom: 0;
  font-size: 100%;
  background: ${({ theme, isActive }) =>
    isActive ? theme.color.indigo[300] : 'transparent'};
  cursor: pointer;
  color: ${({ theme }) => theme.color.white[100]};
  outline: none;
  height: 40px;
  padding: 0 16px;
  margin: 0;
  &:hover {
    background: ${({ theme }) => theme.color.indigo[300]};
    & * {
      color: ${({ theme }) => theme.color.white[100]};
    }
  }
  transition: all 0.25s ease-in-out;
`
