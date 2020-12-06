/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface PivotPanelProps {
  className?: string
}

const PivotPanel: FC<PivotPanelProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(PivotPanel)``
