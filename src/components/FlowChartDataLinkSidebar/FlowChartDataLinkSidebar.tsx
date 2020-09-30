/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface FlowChartDataLinkSidebarProps {
  className?: string
}
const FlowChartDataLinkSidebar: FC<FlowChartDataLinkSidebarProps> = ({
  className,
}) => {
  return <div className={className}> </div>
}

export default styled(FlowChartDataLinkSidebar)`
  min-width: 336px;
  max-width: 336px;
  background: #202124;
  overflow-y: auto;
`
