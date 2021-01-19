import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { FC, MouseEvent, useMemo } from 'react'
import { Table } from 'lib'
import { mock } from './mock'
import TableWrapper from './TableWrapper'
import FlowChartDataInputSidebar from '../FlowChartDataInputSidebar'
import FlowChartPivotSidebar from '../FlowChartPivotSidebar'
import { CellClickFunction, CellState } from 'lib/Table/types'
import { addPivotValue } from 'graphql/mutations/pivotQueue/addPivotValue'
import { usePivotData } from 'graphql/reactiveVars/pivotDataVar'

interface FlowChartDataPanelProps {
  className?: string
  workflowNode?: WorkflowNode
  nodes?: WorkflowNode[]
  childNodes?: WorkflowNode[]
  parentNodes?: WorkflowNode[]
}

const FlowChartDataPanel: FC<FlowChartDataPanelProps> = ({
  className,
  workflowNode,
  childNodes,
  parentNodes,
}) => {
  const data = usePivotData()
  console.log(data)

  const handleCellClick: CellClickFunction = (
    e,
    _key,
    _expandable,
    _rowIndex,
    _expandIndex,
    cellData,
  ) => {}

  const handleDropdownClick = (
    e: MouseEvent<HTMLButtonElement>,
    cell: CellState,
  ) => {
    const parentId = workflowNode!.id
    const childId = e.currentTarget.value
    const value = cell.value
    addPivotValue({ value, parentId, childId })
  }

  /**
   * Dropdown Options
   */

  const shouldRenderDropdown = () => !!childNodes?.length
  const renderTitle = () => 'Add To'
  const renderOptions = () =>
    childNodes?.map((node) => ({
      title: node.displayName,
      subtitle: 'subroute',
      value: node.id, //e.currentTarget.value
      color: node.colorPrimary,
    }))

  /**
   * Render Component
   */

  return (
    <div className={className}>
      <FlowChartDataInputSidebar
        parentNodes={parentNodes}
        activeNode={workflowNode}
      />
      <TableWrapper>
        {workflowNode ? (
          <Table
            title={workflowNode?.displayName}
            subtitle="HOME PATH"
            data={mock}
            onCellClick={handleCellClick}
            cellDropdown={{
              shouldRender: shouldRenderDropdown,
              title: renderTitle,
              options: renderOptions,
              onClick: handleDropdownClick,
            }}
          />
        ) : null}
      </TableWrapper>
      <FlowChartPivotSidebar
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
