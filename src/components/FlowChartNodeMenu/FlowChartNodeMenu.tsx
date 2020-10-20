/** @jsx jsx */
import { FC, useState, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { FiX } from 'react-icons/fi'
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
import services from '../../mock/services'
import { BaseNode } from 'types'

interface FlowChartNodeMenuProps {
  className?: string
  onDragStart: (node: BaseNode, e: DragEvent<HTMLDivElement>) => void
}

const FlowChartNodeMenu: FC<FlowChartNodeMenuProps> = ({
  className,
  onDragStart,
}) => {
  const [isVisible, setVisibility] = useState<Animation>(Animation.NONE)

  const handleClick = () => {
    if (isVisible === Animation.NONE || isVisible === Animation.OUT) {
      return setVisibility(Animation.IN)
    }
    setVisibility(Animation.OUT)
  }

  const handleDragStart = (node: BaseNode, e: DragEvent<HTMLDivElement>) => {
    onDragStart(node, e)
  }
  return (
    <div className={className}>
      <InsertButton onMouseDown={handleClick} />
      <Expander isVisible={isVisible}>
        <Menu isVisible={isVisible}>
          <Header>
            <Text>SERVICES</Text>
            <CloseButton onMouseDown={handleClick}>
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
    </div>
  )
}

export default styled(FlowChartNodeMenu)`
  box-sizing: border-box;
  position: relative;
  height: 100%;
`
