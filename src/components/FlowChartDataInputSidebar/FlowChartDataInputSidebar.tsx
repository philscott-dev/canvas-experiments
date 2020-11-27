import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { FC } from 'react'
import Heading from './Heading'
import ServiceLinkEmpty from 'components/ServiceLinkList/ServiceLinkEmpty'
import { pivotQueueVar } from 'graphql/cache'
import { useReactiveVar } from '@apollo/client'
import { PivotQueue } from 'components/PivotQueue'

interface FlowChartDataLinkSidebarProps {
  className?: string
  parentNodes?: WorkflowNode[] | undefined
  activeNode?: WorkflowNode
}
const FlowChartDataLinkSidebar: FC<FlowChartDataLinkSidebarProps> = ({
  className,
  parentNodes,
  activeNode,
}) => {
  return (
    <div className={className}>
      <Heading serviceCount={parentNodes?.length ?? 0} />
      {parentNodes?.length ? (
        parentNodes.map((node) => (
          <PivotQueue
            key={node.id}
            childId={activeNode?.id}
            parentId={node?.id}
            title={node.displayName}
            subtitle={'subroute'}
            color={node.colorPrimary}
          />
        ))
      ) : (
        <ServiceLinkEmpty />
      )}
    </div>
  )
}

export default styled(FlowChartDataLinkSidebar)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 336px;
  max-width: 336px;
  background: #202124;
  overflow-y: auto;
  padding: 0 24px;
`
