/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'
import { FiLink2, FiDatabase } from 'react-icons/fi'
import { FaCode, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Control from '../FlowChartControl'
import { FlowChartCodeEditor } from '../FlowChartCodeEditor'
import { ExpandLevel } from './index'

interface FlowChartDetailPanelProps {
  className?: string
  displayName?: string
  activePanel: string
  expanded: ExpandLevel
  onExpand: (expand: ExpandLevel, panel: string) => void
}
const FlowChartDetailPanel: FC<FlowChartDetailPanelProps> = ({
  className,
  displayName,
  expanded,
  activePanel,
  onExpand,
}) => {
  const [lastExpand, setLastExpand] = useState<ExpandLevel>(ExpandLevel.NONE)
  const handleNameClick = () => {
    const level = expanded === ExpandLevel.NONE ? lastExpand : ExpandLevel.NONE
    onExpand(level, activePanel)
  }
  const handleCodeClick = () => {
    setLastExpand(ExpandLevel.MID)
    onExpand(ExpandLevel.MID, 'code')
  }
  const handleLinkClick = () => {
    setLastExpand(ExpandLevel.MID)
    onExpand(ExpandLevel.MID, 'link')
  }

  const handleDataClick = () => {
    setLastExpand(ExpandLevel.FULL)
    onExpand(ExpandLevel.FULL, 'data')
  }
  return (
    <div className={className}>
      <Bar>
        <FlexLeft>
          <Control value="expand" onClick={handleNameClick}>
            {expanded !== ExpandLevel.NONE ? (
              <FaChevronDown />
            ) : (
              <FaChevronUp />
            )}
            <Title>{displayName || 'Select A Node'}</Title>
          </Control>
          <Control
            value="code"
            isActive={activePanel === 'code'}
            onClick={handleCodeClick}
          >
            <FaCode />
          </Control>
          <Control
            value="link"
            isActive={activePanel === 'link'}
            onClick={handleLinkClick}
          >
            <FiLink2 />
          </Control>
          <Control
            value="data"
            isActive={activePanel === 'data'}
            onClick={handleDataClick}
          >
            <FiDatabase />
          </Control>
        </FlexLeft>
      </Bar>
      <Body expanded={expanded}>
        <FlowChartCodeEditor expanded={expanded} />
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
  > button {
    border-right: 1px solid ${({ theme }) => theme.color.indigo[600]};
  }
`

const Body = styled.div<{ expanded: ExpandLevel }>`
  box-sizing: border-box;
  pointer-events: all;
  flex: ${({ expanded }) => expanded};
  background: ${({ theme }) => '#202124' || theme.color.blue[700]};
  transition: all 0.25s ease-in-out;
`
