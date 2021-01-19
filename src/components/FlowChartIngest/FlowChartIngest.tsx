import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { FC, useMemo } from 'react'
import IngestSidebar from './IngestSidebar'
import FlowChartPivotSidebar from 'components/FlowChartPivotSidebar'
import { addPivotValue, removePivotValue } from 'graphql/mutations/pivotQueue'

interface FlowChartIngestProps {
  className?: string
  workflowNode?: WorkflowNode
  childNodes?: WorkflowNode[]
}

const FlowChartIngest: FC<FlowChartIngestProps> = ({
  className,
  workflowNode,
  childNodes,
}) => {
  const handleParse = (parsed: string[]) => {
    if (childNodes) {
      const parentId = workflowNode?.id
      for (const value of parsed) {
        for (const child of childNodes) {
          addPivotValue({ value, parentId, childId: child.id })
        }
      }
    }
  }
  return (
    <div className={className}>
      <IngestSidebar onParse={handleParse} />
      <div style={{ flex: 1 }} />
      <FlowChartPivotSidebar
        childNodes={childNodes}
        activeNode={workflowNode}
      />
    </div>
  )
}

export default styled(FlowChartIngest)`
  display: flex;
  height: 100%;
`
