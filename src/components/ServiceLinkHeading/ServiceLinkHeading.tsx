import styled from '@emotion/styled'
import { FC, MouseEvent } from 'react'
import ServiceLinkIcon from './ServiceLinkIcon'
import { Text } from 'lib'
import ServiceLinkCount from './ServiceLinkCount'

interface ServiceLinkHeadingProps {
  className?: string
  title: string
  subtitle?: string
  showCount?: boolean
  count?: number
  color: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const ServiceLinkHeading: FC<ServiceLinkHeadingProps> = ({
  className,
  title,
  subtitle,
  showCount = true,
  count,
  color,
  onClick,
}) => {
  return (
    <button className={className} onClick={onClick}>
      <ServiceLinkIcon color={color} count={count} />
      <div>
        <Text>{title}</Text>
        <Text.Deemphasized size="small">{subtitle}</Text.Deemphasized>
      </div>
      {showCount ? <ServiceLinkCount count={count} /> : null}
    </button>
  )
}

export default styled(ServiceLinkHeading)`
  display: flex;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin-top: 32px;
`
