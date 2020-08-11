/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { FiZoomIn, FiZoomOut } from 'react-icons/fi'
import { MdFilterCenterFocus } from 'react-icons/md'
import Control from '../FlowChartControl'

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
      <Control value="zoom-out" onClick={onZoomOut}>
        <FiZoomOut />
      </Control>
      <Control value="center" onClick={onCenter}>
        <MdFilterCenterFocus />
      </Control>
      <Control value="zoom-in" onClick={onZoomIn}>
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
  > * {
    border-right: 1px solid ${({ theme }) => theme.color.indigo[600]};
    &:nth-last-of-type(1) {
      border-radius: 0 8px 8px 0;
      border-right: 0;
    }
    &:nth-of-type(1) {
      border-radius: 8px 0 0 8px;
    }
  }
`
