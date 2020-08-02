/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { IconButton } from 'lib'
import { FiPlay, FiSkipForward, FiHome } from 'react-icons/fi'
import Text from '../Text'
import Control from '../FlowChartControl'

interface FlowCharTitleBarProps {
  className?: string
}
const FlowCharTitleBar: FC<FlowCharTitleBarProps> = ({ className }) => {
  return (
    <div className={className}>
      <FlexLeft>
        <Control>
          <FiHome />
        </Control>
        <Title>PHIL'S WORKFLOW</Title>
      </FlexLeft>

      <FlexRight>
        <Control>
          <FiSkipForward />
        </Control>
        <Control>
          <FiPlay />
        </Control>
      </FlexRight>
    </div>
  )
}

export default styled(FlowCharTitleBar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  background: ${({ theme }) => theme.color.indigo[400]};
  height: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  pointer-events: all;
`

const FlexLeft = styled.div`
  display: flex;
  align-items: center;
  > * {
    &:nth-of-type(1) {
      border-right: 1px solid ${({ theme }) => theme.color.indigo[600]};
      border-radius: 8px 0 0 8px;
    }
  }
`
const FlexRight = styled.div`
  display: flex;
  align-items: center;
  > * {
    border-left: 1px solid ${({ theme }) => theme.color.indigo[600]};
    &:nth-last-of-type(1) {
      border-radius: 0 8px 8px 0;
      border-right: 0;
    }
  }
`
const Title = styled(Text)`
  padding-left: 16px;
`
