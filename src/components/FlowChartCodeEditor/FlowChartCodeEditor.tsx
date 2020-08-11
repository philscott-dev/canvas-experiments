/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useRef, useState, useEffect } from 'react'
import { jsx, css } from '@emotion/react'
import dynamic from 'next/dynamic'
import { format } from 'date-fns'
import { ExpandLevel } from 'components/FlowChartDetailPanel'
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const dateFormat = 'HH:mm:ss'

interface FlowChartCodeEditorProps {
  className?: string
  expanded: ExpandLevel
}
const FlowChartCodeEditor: FC<FlowChartCodeEditorProps> = ({
  className,
  expanded,
}) => {
  const editorRef = useRef<{
    className: string
    wrapperClassName: string
    onDidChangeModelContent: (cb: () => void) => void
    getValue: () => void
  }>()
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isVisible, setVisible] = useState(false)
  const [terminalValue, setTerminalValue] = useState(
    `${format(new Date(), dateFormat)}:~$ Initialized \r\n`,
  )

  useEffect(() => {
    if (terminalValue && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalValue])

  // useDelayedExpand
  useEffect(() => {
    if (expanded) {
      const timeout = setTimeout(() => {
        setVisible(true)
      }, 250)
      return () => clearTimeout(timeout)
    } else {
      setVisible(false)
    }
  }, [expanded])

  const handleEditorDidMount = (_: () => string, editor: any) => {
    editorRef.current = editor
  }

  const handleEvalScript = () => {
    const date = format(new Date(), dateFormat)
    const editor = editorRef?.current ?? null
    if (editor) {
      const script = editor.getValue() as string | undefined
      if (script && script.length) {
        try {
          const result = new Function(script)
          const response = result.call(null, 1)
          console.log(response)
          setTerminalValue(terminalValue + `${date}:~$ Success \r\n`)
        } catch (err) {
          console.log(err)
          setTerminalValue(terminalValue + date + ':~$ ' + err + '\r\n')
        }
      }
    }
  }

  const listenEditorChanges = () => {
    const editor = editorRef?.current ?? null
    if (editor) {
      editor.onDidChangeModelContent(() => {
        console.log(editor.getValue())
      })
    }
  }

  return (
    <Wrapper className={className} isVisible={isVisible}>
      <TestButton onMouseDown={handleEvalScript} isVisible={isVisible}>
        Test Script
      </TestButton>
      <Editor
        className="editor"
        wrapperClassName="editor-wrapper"
        value={
          '// Use keyword "arguments" to extract values from previous scripts \r\n' +
          '// Ensure you return a single value to pass to the next script \r\n' +
          '// Example Script: \r\n' +
          '\r\n' +
          'const [arg] = arguments \r\n' +
          '\r\n' +
          'return arg + 1'
        }
        editorDidMount={handleEditorDidMount}
        language="javascript"
        theme="dark"
        options={{
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        }}
        css={css`
          flex: 1;
          display: ${isVisible ? 'visible' : 'none'};
          box-sizing: border-box;
          height: calc((100vh / 2) - 40px - 24px);
          width: 200px;
          transition: all 0.25s ease-in-out;
        `}
      />
      <Terminal ref={terminalRef} spellCheck={false} isVisible={isVisible}>
        {terminalValue}
      </Terminal>
    </Wrapper>
  )
}

export default FlowChartCodeEditor

const Wrapper = styled.div<{ isVisible: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  display: flex;
  position: relative;
  background: #202124;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
`

const TestButton = styled.button<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'visible' : 'none')};
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 150;
  transition: all 0.25s ease-in-out;
`

const Terminal = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'visible' : 'none')};
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
