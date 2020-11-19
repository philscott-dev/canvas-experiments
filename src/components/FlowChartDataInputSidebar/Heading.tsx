import styled from '@emotion/styled'
import { Text } from 'lib'
import { Flex } from 'lib/Flex'
import { FC } from 'react'
import HeadingIcon from './HeadingIcon'

interface HeadingProps {
  className?: string
  serviceCount?: number
}

const Heading: FC<HeadingProps> = ({ className, serviceCount }) => {
  return (
    <div className={className}>
      <Flex>
        <HeadingIcon />
        <div>
          <Text size="large">Input Parameters</Text>
          <Text.Deemphasized size="small">
            {serviceCount} total connections
          </Text.Deemphasized>
        </div>
      </Flex>
    </div>
  )
}

export default styled(Heading)`
  margin-top: 24px;
  margin-left: -6px;
  /* margin-left: 16px;
  margin-right: 16px; */
`
