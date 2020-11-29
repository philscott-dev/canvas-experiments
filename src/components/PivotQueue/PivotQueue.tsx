import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { ServiceLinkHeading } from 'components/ServiceLinkHeading'
import { usePivotQueue } from 'graphql/queries/getPivotQueue'
import PivotValue from './PivotValue'
import { IDType, QueueFunctionType } from '.'
import { removePivotValue } from 'graphql/mutations/pivotQueue'

interface PivotQueueProps {
  className?: string
  parentId?: IDType
  childId?: IDType
  title: string
  subtitle?: string
  color: string
  onSelectValue: QueueFunctionType
  onRemoveValue: QueueFunctionType
}

const PivotQueue: FC<PivotQueueProps> = ({
  className,
  parentId,
  childId,
  title,
  subtitle,
  color,
  onRemoveValue,
  onSelectValue,
}) => {
  const queue = usePivotQueue(childId, parentId)
  const [isCollapsed, setCollapsed] = useState(false)
  const handleHeadingClick = () => {
    setCollapsed(!isCollapsed)
  }
  const handleSelectValue = (value: any) => {
    onSelectValue(value, parentId, childId)
  }
  const handleRemoveValue = (value: any) => {
    onRemoveValue(value, parentId, childId)
    removePivotValue({ value, parentId, childId })
  }

  return (
    <div className={className}>
      <ServiceLinkHeading
        title={title}
        subtitle={subtitle || 'subroute'}
        color={color}
        isCollapsed={isCollapsed}
        onMouseDown={handleHeadingClick}
        count={queue?.length ?? 0}
      />
      {isCollapsed ? null : (
        <>
          {queue.map((value, index) => (
            <PivotValue
              key={index}
              value={value}
              onSelectValue={handleSelectValue}
              onRemoveValue={handleRemoveValue}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default styled(PivotQueue)``
