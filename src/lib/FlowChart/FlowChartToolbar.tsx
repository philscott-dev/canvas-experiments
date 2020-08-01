/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

interface FlowChartToolbarProps {
  className?: string
}
const FlowChartToolbar: FC<FlowChartToolbarProps> = ({
  className,
  children,
}) => {
  return <div className={className}>{children}</div>
}

export default styled(FlowChartToolbar)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  padding: 24px;
  top: 0;
  left: 0;
  right: 0;
`
