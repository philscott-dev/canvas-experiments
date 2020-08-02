/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { IconButton } from 'lib'
import { FiPlay, FiSkipForward, FiHome } from 'react-icons/fi'
import Text from '../Text'

interface FlowCharTitleBarProps {
  className?: string
}
const FlowCharTitleBar: FC<FlowCharTitleBarProps> = ({ className }) => {
  return (
    <div className={className}>
      <Flex>
        <Control>
          <FiHome />
        </Control>
        <Title>PHIL'S WORKFLOW</Title>
      </Flex>
      <Flex>
        <Control>
          <FiSkipForward />
        </Control>
        <Control>
          <FiPlay />
        </Control>
      </Flex>
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
  overflow: hidden;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled(Text)`
  padding-left: 16px;
`

const Control = styled(IconButton)`
  box-sizing: border-box;
  border-left: 1px solid ${({ theme }) => theme.color.indigo[600]};
  height: 40px;
  width: 48px;
  &:hover {
    background: ${({ theme }) => theme.color.indigo[300]};
    & * {
      color: ${({ theme }) => theme.color.white[100]};
    }
  }
  transition: all 0.25s ease-in-out;
`
