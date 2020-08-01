/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

interface FlowCharTitleBarProps {
  className?: string
}
const FlowCharTitleBar: FC<FlowCharTitleBarProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(FlowCharTitleBar)`
  background: ${({ theme }) => theme.gradient.gray};
`
