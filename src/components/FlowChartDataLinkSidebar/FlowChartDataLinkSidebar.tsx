import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { ServiceLinkHeading } from 'components/ServiceLinkHeading'
import { FC } from 'react'
import Heading from './Heading'
import ServiceLinkEmpty from 'components/ServiceLinkList/ServiceLinkEmpty'

interface FlowChartDataLinkSidebarProps {
  className?: string
  childNodes?: WorkflowNode[] | undefined
}
const FlowChartDataLinkSidebar: FC<FlowChartDataLinkSidebarProps> = ({
  className,
  childNodes,
}) => {
  return (
    <div className={className}>
      <Heading serviceCount={childNodes?.length ?? 0} />
      {childNodes?.length ? (
        childNodes.map((node) => (
          <ServiceLinkHeading
            key={node.id}
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
