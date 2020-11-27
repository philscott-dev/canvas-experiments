import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { Anchor, IconButton } from 'lib'
import { FiX } from 'react-icons/fi'

interface PivotValueProps {
  className?: string
  value: string
  onMouseDown: () => void
  onRemove: () => void
}

const PivotValue: FC<PivotValueProps> = ({
  className,
  value,
  onMouseDown,
  onRemove,
}) => {
  return (
    <div className={className}>
      <RemoveButton onMouseDown={onRemove}>
        <FiX />
      </RemoveButton>
      <Anchor size="small" onMouseDown={onMouseDown}>
        {value}
      </Anchor>
    </div>
  )
}

export default styled(PivotValue)`
  display: flex;
  padding-left: 2px;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    > button {
      visibility: visible;
    }
  }
`

const RemoveButton = styled(IconButton)`
  visibility: hidden;
  margin-right: 18px;
`
