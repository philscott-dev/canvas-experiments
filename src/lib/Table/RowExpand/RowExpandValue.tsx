/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useEffect, useState } from 'react'
import { jsx } from '@emotion/react'
import { splitAndUpperCase } from 'helpers/string'
import { ValueType } from '../types'
import { useValueType } from '../useValueType'
import RowExpandArrow from './RowExpandArrow'

interface RowExpandValueProps {
  className?: string
  cellKey: string
  expandKey: string
  value: ValueType
  index?: number
  onExpand: (key: string, index?: number) => void
}
const RowExpandValue: FC<RowExpandValueProps> = ({
  className,
  cellKey,
  expandKey,
  index,
  value,
  onExpand,
}) => {
  const cell = useValueType(value)
  const [title, setTitle] = useState('')
  useEffect(() => {
    setTitle(splitAndUpperCase(cellKey || ''))
  }, [cellKey])

  const handleClick = () => {
    if (cell.type === 'object') {
      onExpand(cellKey, index)
    }
  }
  return (
    <ValueButton
      className={className}
      isActive={expandKey === cellKey}
      onMouseDown={handleClick}
    >
      <Heading>{title}</Heading>
      <Flex>
        <Text>{cell.value}</Text>
        {cell.type === 'object' ? (
          <RowExpandArrow isActive={expandKey === cellKey} />
        ) : null}
      </Flex>
    </ValueButton>
  )
}

export default RowExpandValue

const ValueButton = styled.button<{ isActive: boolean }>`
  box-sizing: border-box;
  padding: 6px;
  margin: 0;
  margin-right: 24px;
  min-width: 88px;
  outline: none;
  border-radius: 2px;
  cursor: pointer;
  background: transparent;
  border: none;
  border: 2px solid
    ${({ theme, isActive }) =>
      isActive ? theme.color.blue[300] : 'transparent'};
  &:hover {
    border: 2px solid ${({ theme }) => theme.color.blue[300]};
  }
  transition: all 0.1s ease-in-out;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const Heading = styled.p`
  font-family: ${({ theme }) => theme.font.family};
  color: #9f9f9f;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 15px;
  padding: 0;
  margin: 0;
  margin-bottom: 6px;
  text-transform: uppercase;
  text-align: left;
`

const Text = styled.p`
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  margin: 0;
  padding: 0;
  text-align: left;
`
