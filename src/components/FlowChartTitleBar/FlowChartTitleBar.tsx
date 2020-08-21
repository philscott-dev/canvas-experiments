/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Text from '../FlowChart/Text'
import Control from '../FlowChartControl'
import { useRouter } from 'next/router'
import {
  FiPlay,
  FiSkipForward,
  FiHome,
  FiDatabase,
  FiGitPullRequest,
} from 'react-icons/fi'

interface FlowCharTitleBarProps {
  className?: string
}
const FlowCharTitleBar: FC<FlowCharTitleBarProps> = ({ className }) => {
  const router = useRouter()
  const handleRoute = (route?: string) => {
    if (route) {
      router.push(route)
    }
  }

  const handleAction = (action?: string) => {
    console.log(action)
  }
  return (
    <div className={className}>
      <FlexLeft>
        <Control value="options" onClick={handleAction}>
          <Title>PHIL'S WORKFLOW</Title>
        </Control>
        <Control value={'/'} onClick={handleRoute}>
          <FiHome />
        </Control>
        <Control value={'/'} onClick={handleRoute}>
          <FiGitPullRequest />
        </Control>
        <Control value={'/data'} onClick={handleRoute}>
          <FiDatabase />
        </Control>
      </FlexLeft>

      <FlexRight>
        <Control value={'next'} onClick={handleAction}>
          <FiSkipForward />
        </Control>
        <Control value={'play'} onClick={handleAction}>
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
  box-sizing: border-box;
  margin: 24px;
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
  > button {
    border-right: 1px solid ${({ theme }) => theme.color.indigo[600]};
    &:nth-of-type(1) {
      border-radius: 8px 0 0 8px;
    }
  }
`
const FlexRight = styled.div`
  display: flex;
  align-items: center;
  > button {
    border-left: 1px solid ${({ theme }) => theme.color.indigo[600]};
    &:nth-last-of-type(1) {
      border-radius: 0 8px 8px 0;
    }
  }
`
const Title = styled(Text)``
