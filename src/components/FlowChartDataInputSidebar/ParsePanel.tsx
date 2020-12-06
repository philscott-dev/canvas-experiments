/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'

interface ParsePanelProps {
  className?: string
}

const ParsePanel: FC<ParsePanelProps> = ({ className }) => {
  return <div className={className}></div>
}

export default styled(ParsePanel)``
