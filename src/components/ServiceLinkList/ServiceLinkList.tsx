/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface ListProps {
  className?: string
  title: string
  subtitle?: string
  count?: number
  countName?: string
}
const List: FC<ListProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(List)``
