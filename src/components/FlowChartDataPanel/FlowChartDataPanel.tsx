import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { createElement, FC, MouseEvent, useMemo, useRef } from 'react'
import { Table } from 'lib'
import { mock } from './mock'
import FlowChartDataInputSidebar from '../FlowChartDataInputSidebar'
import FlowChartDataLinkSidebar from '../FlowChartDataLinkSidebar'
import { CellClickFunction, CellState } from 'lib/Table/types'
import { pivotQueueVar } from 'graphql/cache'
import { useReactiveVar } from '@apollo/client'
import { PivotQueue } from 'components/PivotQueue'
import { addPivotValue } from 'graphql/mutations/pivotQueue/addPivotValue'

interface FlowChartDataPanelProps {
  className?: string
  workflowNode?: WorkflowNode
  nodes?: WorkflowNode[]
}

const FlowChartDataPanel: FC<FlowChartDataPanelProps> = ({
  className,
  workflowNode,
  nodes,
}) => {
  const pivotQueue = useReactiveVar(pivotQueueVar)
  const childNodes = useMemo(
    () => nodes?.filter((node) => node.parentId === workflowNode?.id),
    [nodes, workflowNode],
  )

  const parentNodes = useMemo(
    () => nodes?.filter((node) => node.id === workflowNode?.parentId),
    [nodes, workflowNode],
  )

  const handleCellClick: CellClickFunction = (
    e,
    _key,
    _expandable,
    _rowIndex,
    _expandIndex,
    cellData,
  ) => {
    console.log(_key, _expandable, cellData)
  }

  const handleDropdownClick = (
    e: MouseEvent<HTMLButtonElement>,
    cell: CellState,
  ) => {
    const parentId = workflowNode!.id
    const childId = e.currentTarget.value
    const value = cell.value
    addPivotValue({ value, parentId, childId })
  }

  const renderOptions = () => {}

  return (
    <div className={className}>
      <FlowChartDataInputSidebar
        parentNodes={parentNodes}
        activeNode={workflowNode}
      />
      <Wrapper>
        {workflowNode ? (
          <Table
            title={workflowNode?.displayName}
            subtitle="HOME PATH"
            data={mock}
            onCellClick={handleCellClick}
            cellDropdown={{
              shouldRender: () => !!childNodes?.length,
              title: () => 'Add To',
              options: (cell) =>
                childNodes?.map((node) => ({
                  title: node.displayName,
                  subtitle: 'subroute',
                  value: node.id, //e.currentTarget.value
                  color: node.colorPrimary,
                })),
              onClick: handleDropdownClick,
            }}
          />
        ) : null}
      </Wrapper>
      <FlowChartDataLinkSidebar
        childNodes={childNodes}
        activeNode={workflowNode}
      />
    </div>
  )
}

export default styled(FlowChartDataPanel)`
  display: flex;
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 24px;
  overflow: auto;
`

const Container = styled.section`
  flex: 1;
  overflow: auto;
`
