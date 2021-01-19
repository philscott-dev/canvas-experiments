import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { FC, useMemo } from 'react'
import { FiLink2, FiDatabase } from 'react-icons/fi'
import { FaCode, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { ExpandLevel } from 'enums'
import { FlowChartCodeEditor, FlowChartControl as Control } from 'components'
import useLastExpand from './useLastExpand'
import FlowChartDataPanel from '../FlowChartDataPanel/FlowChartDataPanel'
import { Bar, Body, DetailPanel, FlexLeft, FlexRight, Title } from './index'
import FlowChartIngest from 'components/FlowChartIngest/FlowChartIngest'

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
  const childNodes = useMemo(
    () =>
      nodes?.filter((node) =>
        node.parentIds.some((id) => id === workflowNode?.id),
      ),
    [nodes, workflowNode],
  )

  const parentNodes = useMemo(
    () =>
      nodes?.filter((node) =>
        workflowNode?.parentIds.some((id) => id === node.id),
      ),
    [nodes, workflowNode],
  )

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
            <Title>{workflowNode?.displayName || 'Select a Node'}</Title>
          </Control>
          {workflowNode?.name === 'script' ? (
            <Control
              value="code"
              isActive={activePanel === 'script'}
              onClick={handleTabClick}
            >
              <FaCode />
            </Control>
          ) : null}
          <Control
            value="data"
            isActive={activePanel === 'data'}
            onClick={handleTabClick}
          >
            <FiDatabase />
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

      {/* Detail Panel */}
      <Body expandLevel={expandLevel}>
        {/* Script */}
        <DetailPanel isActive={workflowNode?.name === 'script'}>
          <FlowChartCodeEditor
            isActive={workflowNode?.name === 'script'}
            expandLevel={expandLevel}
          />
        </DetailPanel>
        {/* Ingest */}
        <DetailPanel
          isActive={activePanel === 'data' && workflowNode?.name !== 'ingest'}
        >
          <FlowChartDataPanel
            workflowNode={workflowNode}
            nodes={nodes}
            childNodes={childNodes}
            parentNodes={parentNodes}
          />
        </DetailPanel>
        {/* Service Data */}
        <DetailPanel
          isActive={activePanel === 'data' && workflowNode?.name === 'ingest'}
        >
          <FlowChartIngest
            workflowNode={workflowNode}
            childNodes={childNodes}
          />
        </DetailPanel>
      </Body>
    </section>
  )
}

export default styled(FlowChartDetailPanel)`
  z-index: 1;
  display: flex;
  flex: 1;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-end;
  height: 50%; /* Important for scrolling */
  transition: all 0.25s ease-in-out;
`
