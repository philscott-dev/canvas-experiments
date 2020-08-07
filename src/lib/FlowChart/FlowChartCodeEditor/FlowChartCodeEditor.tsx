/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useRef, useState, useEffect } from 'react'
import { jsx, css } from '@emotion/react'
import dynamic from 'next/dynamic'
import { monaco } from '@monaco-editor/react'
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface FlowChartCodeEditorProps {
  className?: string
  isExpanded: boolean
}
const FlowChartCodeEditor: FC<FlowChartCodeEditorProps> = ({
  className,
  isExpanded,
}) => {
  const editorRef = useRef<{
    className: string
    wrapperClassName: string
    onDidChangeModelContent: (cb: () => void) => void
    getValue: () => void
  }>()
  const [isVisible, setVisible] = useState(false)
  useEffect(() => {
    if (isExpanded) {
      const timeout = setTimeout(() => {
        setVisible(isExpanded)
      }, 250)
      return () => clearTimeout(timeout)
    } else {
      setVisible(isExpanded)
    }
  }, [isExpanded])

  const handleEditorDidMount = (_: () => string, editor: any) => {
    editorRef.current = editor
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
    <div className={className}>
      <Editor
        className="editor"
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
          display: ${isVisible ? 'visible' : 'none'};
          box-sizing: border-box;
          height: calc((100vh / 2) - 40px - 24px);
          transition: all 0.25s ease-in-out;
        `}
      />
    </div>
  )
}

export default styled(FlowChartCodeEditor)`
  background: #202124;
  box-sizing: border-box;
`