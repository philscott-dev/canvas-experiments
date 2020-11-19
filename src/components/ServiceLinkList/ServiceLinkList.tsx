/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'

interface ServiceLinkListProps {
  className?: string
  title: string
  subtitle?: string
  count?: number
  countName?: string
}
const ServiceLinkList: FC<ServiceLinkListProps> = ({ className }) => {
  return (
    <div className={className}>
      <Text>
        No Connections. Please drag and drop a new connection from this active
        node.
      </Text>
    </div>
  )
}

export default styled(ServiceLinkList)`
  margin-top: 32px;
`
