/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { Button } from 'lib'
import { FC } from 'react'
import Text from './Text'
import { FiDownload } from 'react-icons/fi'

interface InsertButtonProps {
  className?: string
  onMouseDown: () => void
}
const InsertButton: FC<InsertButtonProps> = ({ className, onMouseDown }) => {
  return (
    <Button.Primary onMouseDown={onMouseDown} className={className}>
      <Text>NODES</Text>
      <InsertIcon />
    </Button.Primary>
  )
}

export default styled(InsertButton)`
  pointer-events: all;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  min-height: 40px;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.indigo[400]};
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 400;
  border: none;
  &:hover {
    background: ${({ theme }) => theme.color.indigo[300]};
  }
`

const InsertIcon = styled(FiDownload)`
  margin-left: 16px;
  font-size: 16px;
`
