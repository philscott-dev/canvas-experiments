import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { FC } from 'react'
import { FiLink2, FiDatabase } from 'react-icons/fi'
import { FaCode, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { ExpandLevel } from 'enums'
import { FlowChartCodeEditor, FlowChartControl as Control } from 'components'
import useLastExpand from './useLastExpand'
import FlowChartDataPanel from '../FlowChartDataPanel/FlowChartDataPanel'
import { Bar, Body, DetailPanel, FlexLeft, FlexRight, Title } from './index'

interface FlowChartDetailPanelProps {
  className?: string
  displayName?: string
  activePanel?: string
  expandLevel: ExpandLevel
  workflowNode?: WorkflowNode
  nodes?: WorkflowNode[]
  onExpand: (expand: ExpandLevel) => void
  onActivePanel: (panel: string) => void
}
const FlowChartDetailPanel: FC<FlowChartDetailPanelProps> = ({
  className,
  displayName,
  expandLevel,
  activePanel,
  workflowNode,
  nodes,
  onExpand,
  onActivePanel,
}) => {
  const lastExpand = useLastExpand(expandLevel)
  const handleNameClick = () => {
    onExpand(expandLevel === ExpandLevel.NONE ? lastExpand : ExpandLevel.NONE)
  }

  const handleTabClick = (value?: string) => {
    if (value) {
      onActivePanel(value)
      if (expandLevel === ExpandLevel.NONE) {
        onExpand(lastExpand || ExpandLevel.MID)
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
    <section className={className}>
      <Bar>
        <FlexLeft>
          <Control value="expand" onClick={handleNameClick}>
            {expandLevel !== ExpandLevel.NONE ? (
              <FaChevronDown />
            ) : (
              <FaChevronUp />
            )}
            <Title>{activePanel || 'Configure'}</Title>
          </Control>
          <Control
            value="data"
            isActive={activePanel === 'data'}
            onClick={handleTabClick}
          >
            <FiDatabase />
          </Control>
          <Control
            value="code"
            isActive={activePanel === 'code'}
            onClick={handleTabClick}
          >
            <FaCode />
          </Control>
          {/* <Control
            value="link"
            isActive={activePanel === 'link'}
            onClick={handleTabClick}
          >
            <FiLink2 />
          </Control> */}
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
      <Body expandLevel={expandLevel}>
        <DetailPanel isActive={activePanel === 'code'}>
          <FlowChartCodeEditor
            isActive={activePanel === 'code'}
            expandLevel={expandLevel}
          />
        </DetailPanel>
        {/* <DetailPanel isActive={activePanel === 'link'}>
          <div>link</div>
        </DetailPanel> */}
        <DetailPanel isActive={activePanel === 'data'}>
          <FlowChartDataPanel workflowNode={workflowNode} nodes={nodes} />
        </DetailPanel>
      </Body>
    </section>
  )
}

export default styled(FlowChartDetailPanel)`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 24px;
  height: 50%; /* Important for scrolling */
  transition: all 0.25s ease-in-out;
`
