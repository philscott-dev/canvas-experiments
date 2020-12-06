/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface ParameterPanelProps {
  className?: string
}

const ParameterPanel: FC<ParameterPanelProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(ParameterPanel)``
