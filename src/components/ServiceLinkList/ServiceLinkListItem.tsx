/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface ListItemProps {
  className?: string
}
const ListItem: FC<ListItemProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(ListItem)``
