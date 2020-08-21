/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useEffect, useRef } from 'react'
import { jsx } from '@emotion/react'

interface TerminalProps {
  className?: string
  outputValue: string
  onEvalScript: () => void
}

const Terminal: FC<TerminalProps> = ({
  className,
  outputValue,
  onEvalScript,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (outputValue && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [outputValue])

  return (
    <div className={className} spellCheck={false}>
      <TestButton onMouseDown={onEvalScript}>Test Script</TestButton>
      {outputValue}
    </div>
  )
}

export default styled(Terminal)`
  font-family: monospace;
  flex: 1;
  border-left: 1px solid #424242;
  outline: none;
  border: none;
  background: #202124;
  resize: none;
  padding: 0 16px;
  max-height: calc((100vh / 2) - 40px - 24px);
  color: #d4d4d4;
  overflow-y: auto;
  white-space: pre-wrap;
  transition: all 0.25s ease-in-out;
`

const TestButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 150;
  transition: all 0.25s ease-in-out;
`
