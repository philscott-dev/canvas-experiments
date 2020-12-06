/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface TabbarProps {
  className?: string
}

const Tabbar: FC<TabbarProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(Tabbar)``
