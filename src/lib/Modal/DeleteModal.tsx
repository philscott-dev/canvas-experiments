/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import Modal from './Modal'
import { Button } from '../Button'
import { Text } from '../Text'

interface DeleteModalProps {
  className?: string
  isVisible: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteModal: FC<DeleteModalProps> = ({
  className,
  onClose,
  onDelete,
  isVisible,
}) => {
  return (
    <Modal title="DELETE" isVisible={isVisible} onClose={onClose}>
      <Text size="large">Are you sure you want to delete this node?</Text>
      <div className={className}>
        <Button.Tertiary onMouseDown={onClose}>CANCEL</Button.Tertiary>
        <Button.Primary onMouseDown={onDelete}>DELETE</Button.Primary>
      </div>
    </Modal>
  )
}

export default styled(DeleteModal)`
  display: flex;
  margin-top: 32px;
  > button {
    flex: 1;
    &:nth-of-type(1) {
      margin-right: 32px;
    }
  }
`
