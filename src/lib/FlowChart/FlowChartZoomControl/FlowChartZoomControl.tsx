/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { IconButton } from 'lib'
import { FiZoomIn, FiZoomOut, FiAlignCenter } from 'react-icons/fi'
import { MdFilterCenterFocus } from 'react-icons/md'

interface FlowChartZoomControlProps {
  className?: string
  onCenter: () => void
  onZoomIn: () => void
  onZoomOut: () => void
}
const FlowChartZoomControl: FC<FlowChartZoomControlProps> = ({
  className,
  onCenter,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <div className={className}>
      <Control onMouseDown={onZoomOut}>
        <FiZoomOut />
      </Control>
      <Control onMouseDown={onCenter}>
        <MdFilterCenterFocus />
      </Control>
      <Control onMouseDown={onZoomIn}>
        <FiZoomIn />
      </Control>
    </div>
  )
}

export default styled(FlowChartZoomControl)`
  display: flex;
  background: ${({ theme }) => theme.color.indigo[400]};
  height: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  pointer-events: all;
  overflow: hidden;
`

const Control = styled(IconButton)`
  box-sizing: border-box;
  border-left: 1px solid ${({ theme }) => theme.color.indigo[600]};
  height: 40px;
  width: 48px;
  &:hover {
    background: ${({ theme }) => theme.color.indigo[300]};
    & * {
      color: ${({ theme }) => theme.color.white[100]};
    }
  }
  transition: all 0.25s ease-in-out;
`
