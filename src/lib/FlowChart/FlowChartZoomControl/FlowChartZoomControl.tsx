/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

interface FlowChartZoomControlProps {
  className?: string
}
const FlowChartZoomControl: FC<FlowChartZoomControlProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(FlowChartZoomControl)`
  background: ${({ theme }) => theme.gradient.gray};
`
