/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { jsx } from '@emotion/react'

interface FlowChartDetailPanelProps {
  className?: string
}
const FlowChartDetailPanel: FC<FlowChartDetailPanelProps> = ({ className }) => {
  const [isExpanded, setExpanded] = useState(false)
  return (
    <div className={className}>
      <Bar onMouseDown={() => setExpanded(!isExpanded)} />
      <Body isExpanded={isExpanded}></Body>
    </div>
  )
}

export default styled(FlowChartDetailPanel)`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 24px;
`

const Bar = styled.div`
  box-sizing: border-box;
  pointer-events: all;
  min-height: 40px;
  max-height: 40px;
  background: ${({ theme }) => theme.color.indigo[400]};
`
const Body = styled.div<{ isExpanded: boolean }>`
  box-sizing: border-box;
  pointer-events: all;
  flex: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  background: ${({ theme }) => theme.color.blue[700]};
  transition: all 0.25s ease-in-out;
`
