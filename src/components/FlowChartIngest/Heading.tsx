import styled from '@emotion/styled'
import { Text } from 'lib'
import { Flex } from 'lib/Flex'
import { FC } from 'react'
import Textarea from './Textarea'
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
          <Text size="large">Ingest Values</Text>
          <Text.Deemphasized size="small">
            Parse values by newline
          </Text.Deemphasized>
        </div>
      </Flex>
    </div>
  )
}

export default styled(Heading)`
  margin-top: 24px;
  margin-left: -6px;
  margin-bottom: 24px;
  /* margin-left: 16px;
  margin-right: 16px; */
`
