import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import { FC, useState, DragEvent } from 'react'
import styled from '@emotion/styled'
import { FiCloud, FiX } from 'react-icons/fi'
import { GrAction } from 'react-icons/gr'
import { Animation } from './animation/enum'
import FlowChartNode from '../FlowChartNode/FlowChartNode'
import Expander from './Expander'
import Menu from './Menu'
import CloseButton from './CloseButton'
import InsertButton from './InsertButton'
import Header from './Header'
import SearchInput from './SearchInput'
import MenuBody from './MenuBody'
import Text from './Text'

//make this date driven
import actions from 'mock/actions'
import services from 'mock/services'
import HeaderTitle from './HeaderTitle'

interface FlowChartNodeMenuProps {
  className?: string
  onDragStart: (node: WorkflowNode, e: DragEvent<HTMLDivElement>) => void
}

const FlowChartNodeMenu: FC<FlowChartNodeMenuProps> = ({
  className,
  onDragStart,
}) => {
  const [isActionsVisible, setActionsVisible] = useState<Animation>(
    Animation.NONE,
  )
  const [isServicesVisible, setServicesVisible] = useState<Animation>(
    Animation.NONE,
  )

  const handleServicesClick = () => {
    if (
      isServicesVisible === Animation.NONE ||
      isServicesVisible === Animation.OUT
    ) {
      return setServicesVisible(Animation.IN)
    }
    setServicesVisible(Animation.OUT)
  }

  const handleActionsClick = () => {
    if (
      isActionsVisible === Animation.NONE ||
      isActionsVisible === Animation.OUT
    ) {
      return setActionsVisible(Animation.IN)
    }
    setActionsVisible(Animation.OUT)
  }

  const handleDragStart = (
    node: WorkflowNode,
    e: DragEvent<HTMLDivElement>,
  ) => {
    onDragStart(node, e)
  }
  return (
    <div className={className}>
      <InsertButton
        text="SERVICES"
        icon={<FiCloud />}
        onMouseDown={handleServicesClick}
      />
      <InsertButton
        text="ACTIONS"
        icon={<GrAction />}
        onMouseDown={handleActionsClick}
      />
      <Expander isVisible={isServicesVisible}>
        <Menu isVisible={isServicesVisible}>
          <Header>
            <HeaderTitle>
              <FiCloud />
              <Text>SERVICES</Text>
            </HeaderTitle>
            <CloseButton onMouseDown={handleServicesClick}>
              <FiX />
            </CloseButton>
          </Header>
          <SearchInput />
          <MenuBody>
            {services.map((service) => (
              <FlowChartNode
                key={service.id}
                node={service}
                onDragStart={handleDragStart}
              />
            ))}
          </MenuBody>
        </Menu>
      </Expander>
      <Expander isVisible={isActionsVisible} offset={56}>
        <Menu isVisible={isActionsVisible}>
          <Header>
            <HeaderTitle>
              <GrAction />
              <Text>ACTIONS</Text>
            </HeaderTitle>
            <CloseButton onMouseDown={handleActionsClick}>
              <FiX />
            </CloseButton>
          </Header>
          <SearchInput />
          <MenuBody>
            {actions.map((action) => (
              <FlowChartNode
                key={action.id}
                node={action}
                onDragStart={handleDragStart}
              />
            ))}
          </MenuBody>
        </Menu>
      </Expander>
    </div>
  )
}

export default styled(FlowChartNodeMenu)`
  box-sizing: border-box;
  position: relative;
  height: 100%;
`
