/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { Node } from './types'

interface EditPanelProps {
  className?: string
  nodes: Node[]
  activeId?: string
}
const EditPanel: FC<EditPanelProps> = ({ className, activeId }) => {
  const handleSubmit = (obj: any) => {
    console.log(obj)
  }
  return <div className={className}></div>
}

export default styled(EditPanel)`
  min-width: 250px;
`
