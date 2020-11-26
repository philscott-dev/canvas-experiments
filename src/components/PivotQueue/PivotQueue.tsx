import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { ServiceLinkHeading } from 'components/ServiceLinkHeading'

interface PivotQueueProps {
  className?: string
  nodeId: string
  title: string
  subtitle?: string
  color: string
}

const PivotQueue: FC<PivotQueueProps> = ({
  className,
  nodeId,
  title,
  subtitle,
  color,
}) => {
  const [isCollapsed, setCollapsed] = useState(false)
  const handleCollapse = () => {}
  const handleRemoveValue = () => {}
  return (
    <div className={className}>
      <ServiceLinkHeading
        title={title}
        subtitle={subtitle || 'subroute'}
        color={color}
      />
    </div>
  )
}

export default styled(PivotQueue)``
