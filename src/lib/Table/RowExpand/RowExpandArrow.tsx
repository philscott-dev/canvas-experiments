/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface RowExpandArrowProps {
  className?: string
  isActive: boolean
}
const RowExpandArrow: FC<RowExpandArrowProps> = ({ className, isActive }) => {
  return (
    <ArrowIconWrap className={className}>
      {isActive ? <FiChevronUp /> : <FiChevronDown />}
    </ArrowIconWrap>
  )
}

export default RowExpandArrow

const ArrowIconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: ${({ theme }) => theme.color.white[100]};
`
