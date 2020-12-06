/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface IconTabbarProps {
  className?: string
}

const IconTabbar: FC<IconTabbarProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

export default styled(IconTabbar)`
  display: flex;
`
