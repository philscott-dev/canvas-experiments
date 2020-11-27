import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { ServiceLinkHeading } from 'components/ServiceLinkHeading'
import { usePivotQueue } from 'graphql/queries/getPivotQueue'
import PivotValue from './PivotValue'

interface PivotQueueProps {
  className?: string
  parentId?: string | null
  childId?: string | null
  title: string
  subtitle?: string
  color: string
}

const PivotQueue: FC<PivotQueueProps> = ({
  className,
  parentId,
  childId,
  title,
  subtitle,
  color,
}) => {
  const queue = usePivotQueue(childId, parentId)
  console.log(queue, childId, parentId, title)
  const [isCollapsed, setCollapsed] = useState(false)
  const handleHeadingClick = () => {
    setCollapsed(!isCollapsed)
  }

  const handleSelectValue = () => {}
  const handleRemoveValue = () => {}
  return (
    <div className={className}>
      <ServiceLinkHeading
        title={title}
        subtitle={subtitle || 'subroute'}
        color={color}
        isCollapsed={isCollapsed}
        onMouseDown={handleHeadingClick}
      />
      {isCollapsed ? null : (
        <>
          {queue.map((value) => (
            <PivotValue
              value={value}
              onMouseDown={handleSelectValue}
              onRemove={handleRemoveValue}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default styled(PivotQueue)``
