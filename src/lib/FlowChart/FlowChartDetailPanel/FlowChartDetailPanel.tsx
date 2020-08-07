/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { jsx } from '@emotion/react'
import { FiSettings, FiLink2 } from 'react-icons/fi'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Control from '../FlowChartControl'
import Text from '../Text'
import { FlowChartCodeEditor } from '../FlowChartCodeEditor'

interface FlowChartDetailPanelProps {
  className?: string
  displayName?: string
}
const FlowChartDetailPanel: FC<FlowChartDetailPanelProps> = ({
  className,
  displayName,
}) => {
  const [isExpanded, setExpanded] = useState(false)
  const handleNameClick = () => {
    setExpanded(!isExpanded)
  }
  const handleSettingsClick = () => {
    setExpanded(true)
  }
  const handleLinkClick = () => {
    setExpanded(true)
  }
  return (
    <div className={className}>
      <Bar>
        <FlexLeft>
          <Control onMouseDown={handleNameClick}>
            {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
            <Title>{displayName || 'Select A Node'}</Title>
          </Control>
          <Control onMouseDown={handleSettingsClick}>
            <FiSettings />
          </Control>
          <Control onMouseDown={handleLinkClick}>
            <FiLink2 />
          </Control>
        </FlexLeft>
      </Bar>
      <Body isExpanded={isExpanded}>
        <FlowChartCodeEditor isExpanded={isExpanded} />
      </Body>
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

const Title = styled(Text)`
  margin-left: 16px;
  text-transform: uppercase;
`

const Bar = styled.div`
  display: flex;
  box-sizing: border-box;
  pointer-events: all;
  min-height: 40px;
  max-height: 40px;
  background: ${({ theme }) => theme.color.indigo[400]};
`

const FlexLeft = styled.div`
  display: flex;
  align-items: center;
  > * {
    border-right: 1px solid ${({ theme }) => theme.color.indigo[600]};
  }
`

const Body = styled.div<{ isExpanded: boolean }>`
  box-sizing: border-box;
  pointer-events: all;
  flex: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  background: ${({ theme }) => '#202124' || theme.color.blue[700]};
  transition: all 0.25s ease-in-out;
`
