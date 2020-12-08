import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { FC } from 'react'
import Heading from './Heading'
import { ServiceLinkEmpty, IconTabbar, IconTab } from 'components'
import { PivotQueue, QueueFunctionType } from 'components/PivotQueue'
import { setPivotData } from 'graphql/reactiveVars/pivotDataVar'
import fetcher, { Method } from 'services/api'
import mockQuery from 'services/gql_mock'
import { activePivotVar } from 'graphql/reactiveVars/activePivotVar'
import { FiFile, FiFileText, FiGitPullRequest, FiList } from 'react-icons/fi'
import { AiOutlineDatabase, AiOutlineFileSearch } from 'react-icons/ai'

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
  const handleSelectValue: QueueFunctionType = async (
    value,
    parentId,
    childId,
  ) => {
    if (childId && parentId) {
      const res = await fetcher(Method.POST, '/graphql', undefined, mockQuery)
      const data = res.data.allCompanies
      activePivotVar({ value, parentId, childId })
      setPivotData({ data, value, parentId, childId })
    }
  }

  const handleRefetchValue: QueueFunctionType = async (
    value,
    parentId,
    childId,
  ) => {
    if (childId && parentId) {
      const res = await fetcher(Method.POST, '/graphql', undefined, mockQuery)
      setPivotData({ data: res.data, value, parentId, childId })
    }
  }
  const handleRemoveValue: QueueFunctionType = (value, parentId, childId) => {
    console.log(value, parentId, childId)
  }
  return (
    <div className={className}>
      <Heading serviceCount={parentNodes?.length ?? 0} />
      <IconTabbar>
        {/* Pivot Queue */}
        <IconTab isActive>
          <FiGitPullRequest />
        </IconTab>
        {/* Other Parameters */}
        <IconTab disabled>
          <AiOutlineFileSearch />
        </IconTab>
        {/* Manual Parser */}
        <IconTab disabled>
          <AiOutlineDatabase />
        </IconTab>
      </IconTabbar>
      {/* <PivotQueue
        childId={activeNode?.id}
        title={'Manual Input'}
        color={theme.color.indigo[300]}
        onSelectValue={handleSelectValue}
        onRemoveValue={handleRemoveValue}
      /> */}
      {parentNodes?.length ? (
        parentNodes.map((node) => (
          <PivotQueue
            key={node.id}
            childId={activeNode?.id}
            parentId={node?.id}
            title={node.displayName}
            subtitle={'subroute'}
            color={node.colorPrimary}
            onSelectValue={handleSelectValue}
            onRemoveValue={handleRemoveValue}
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
