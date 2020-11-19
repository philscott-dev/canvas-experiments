/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { Text } from 'lib'

interface ServiceLinkCountProps {
  className?: string
  count?: number
}

const ServiceLinkCount: FC<ServiceLinkCountProps> = ({ className, count }) => {
  return (
    <div className={className}>
      <Text.Deemphasized size="small">{count || 0} Items</Text.Deemphasized>
    </div>
  )
}

export default styled(ServiceLinkCount)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`
