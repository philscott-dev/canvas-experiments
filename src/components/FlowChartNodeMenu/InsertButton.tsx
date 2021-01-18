/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { Button } from 'lib'
import { FC } from 'react'
import Text from './Text'
import { FiChevronDown } from 'react-icons/fi'

interface InsertButtonProps {
  className?: string
  onMouseDown: () => void
  text: string
  icon: JSX.Element
}
const InsertButton: FC<InsertButtonProps> = ({
  className,
  onMouseDown,
  text,
  icon,
}) => {
  const handleMouseDown = () => {
    onMouseDown()
  }
  return (
    <Button.Primary onMouseDown={handleMouseDown} className={className}>
      <span>{icon}</span>
      <Text>{text}</Text>
    </Button.Primary>
  )
}

export default styled(InsertButton)`
  justify-content: flex-start;
  box-sizing: content-box;
  pointer-events: all;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  min-height: 40px;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.indigo[400]};
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 400;
  border: none;
  margin-bottom: 16px;
  & > span {
    margin-top: 4px;
    & > svg > path {
      stroke: ${({ theme }) => theme.color.white[100]};
    }
  }
  & > p {
    opacity: 0;
    width: 0;
    padding: 0;
    margin: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.color.indigo[300]};
    & > span {
      margin-right: 8px;
    }
    & > p {
      opacity: 1;
      width: initial;
    }
  }
`

const InsertIcon = styled(FiChevronDown)`
  font-size: 16px;
`
