/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { css, jsx } from '@emotion/react'
import { Text } from 'lib'

interface ServiceLinkEmptyProps {
  className?: string
}
const ServiceLinkEmpty: FC<ServiceLinkEmptyProps> = ({ className }) => {
  return (
    <div className={className}>
      <Text.Emphasized
        size="small"
        css={css`
          text-align: center;
        `}
      >
        No Connections. Please drag and drop a new connection, if applicable.
      </Text.Emphasized>
    </div>
  )
}

export default styled(ServiceLinkEmpty)`
  margin-top: 64px;
`
