import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import { ServiceLinkHeading } from 'components/ServiceLinkHeading'
import styled from '@emotion/styled'
import { FC } from 'react'
import Heading from './Heading'
import ServiceLinkEmpty from 'components/ServiceLinkList/ServiceLinkEmpty'

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
          <ServiceLinkHeading
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
