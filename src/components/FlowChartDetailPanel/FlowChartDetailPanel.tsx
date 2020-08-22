/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'
import { FiLink2, FiDatabase } from 'react-icons/fi'
import { FaCode, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { ExpandLevel } from 'enums'
import { FlowChartCodeEditor, FlowChartControl as Control } from 'components'
import useLastExpand from './useLastExpand'
import FlowChartDataPanel from '../FlowChartDataPanel/FlowChartDataPanel'
import DetailPanelBody from './DetailPanelBody'

interface FlowChartDetailPanelProps {
  className?: string
  displayName?: string
  activePanel: string
  expandLevel: ExpandLevel
  onExpand: (expand: ExpandLevel) => void
  onActivePanel: (panel: string) => void
}
const FlowChartDetailPanel: FC<FlowChartDetailPanelProps> = ({
  className,
  displayName,
  expandLevel,
  activePanel,
  onExpand,
  onActivePanel,
}) => {
  const lastExpand = useLastExpand(expandLevel)
  const handleNameClick = () => {
    const level =
      expandLevel === ExpandLevel.NONE ? lastExpand : ExpandLevel.NONE
    onExpand(level)
  }

  const handleTabClick = (value?: string) => {
    if (value) {
      onActivePanel(value)
      if (expandLevel === ExpandLevel.NONE) {
        onExpand(lastExpand)
      }
    }
  }

  const handleExpand = () => {
    const level = expandLevel + 1
    if (level <= ExpandLevel.FULL) {
      onExpand(level)
    }
  }

  const handleCollapse = () => {
    const level = expandLevel - 1
    if (level >= ExpandLevel.NONE) {
      onExpand(level)
    }
  }

  return (
    <div className={className}>
      <Bar>
        <FlexLeft>
          <Control value="expand" onClick={handleNameClick}>
            {expandLevel !== ExpandLevel.NONE ? (
              <FaChevronDown />
            ) : (
              <FaChevronUp />
            )}
            <Title>{displayName || 'Select A Node'}</Title>
          </Control>
          <Control
            value="code"
            isActive={activePanel === 'code'}
            onClick={handleTabClick}
          >
            <FaCode />
          </Control>
          <Control
            value="link"
            isActive={activePanel === 'link'}
            onClick={handleTabClick}
          >
            <FiLink2 />
          </Control>
          <Control
            value="data"
            isActive={activePanel === 'data'}
            onClick={handleTabClick}
          >
            <FiDatabase />
          </Control>
        </FlexLeft>
        <FlexRight>
          <Control onClick={handleExpand}>
            <FaChevronUp />
          </Control>
          <Control onClick={handleCollapse}>
            <FaChevronDown />
          </Control>
        </FlexRight>
      </Bar>
      <DetailPanelBody
        isActive={activePanel === 'code'}
        expandLevel={expandLevel}
      >
        <FlowChartCodeEditor />
      </DetailPanelBody>
      <DetailPanelBody
        isActive={activePanel === 'link'}
        expandLevel={expandLevel}
      >
        {/* <div>link</div> */}
      </DetailPanelBody>
      <DetailPanelBody
        isActive={activePanel === 'data'}
        expandLevel={expandLevel}
      >
        <FlowChartDataPanel />
      </DetailPanelBody>
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
  transition: all 0.25s ease-in-out;
`

const Title = styled(Text)`
  margin-left: 16px;
  text-transform: uppercase;
`

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
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

const FlexRight = styled.div`
  display: flex;
  align-items: center;
  > button {
    border-left: 1px solid ${({ theme }) => theme.color.indigo[600]};
  }
`
