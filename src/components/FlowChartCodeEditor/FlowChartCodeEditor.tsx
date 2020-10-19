/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useRef, useState, useEffect } from 'react'
import { jsx, css } from '@emotion/react'
import { format } from 'date-fns'
import { initialValue } from './initialValue'
import Terminal from './Terminal'
import Editor from '@monaco-editor/react'
import { ExpandLevel } from 'enums'
import { postPythonScript } from 'services/api'

const dateFormat = 'HH:mm:ss'

interface FlowChartCodeEditorProps {
  className?: string
  isActive: boolean
  expandLevel: ExpandLevel
}
const FlowChartCodeEditor: FC<FlowChartCodeEditorProps> = ({
  className,
  isActive,
  expandLevel,
}) => {
  const editorRef = useRef<{
    onDidChangeModelContent: (cb: () => void) => void
    getValue: () => void
  }>()
  //const [editorValue, setEditorValue] = useState<string>()
  const [outputValue, setOutputValue] = useState(
    `${format(new Date(), dateFormat)}:~$ Initialized \r\n`,
  )

  // delay render by 1 cycle
  // const [editorDidMount, setEditorDidMount] = useState(false)
  const [initRender, setInitRender] = useState<boolean>()
  useEffect(() => {
    if (initRender === undefined && isActive) {
      setInitRender(true)
    }
  }, [isActive, initRender])

  // update semi-controlled value
  // useEffect(() => {
  //   const editor = editorRef?.current ?? null
  //   console.log(editor, editorDidMount)
  //   if (editor && editorDidMount) {
  //     editor.onDidChangeModelContent(() => {
  //       console.log(editor.getValue())
  //     })
  //   }
  // }, [editorDidMount])

  // useEffect(() => {
  //   if (expandLevel && editorRef.current) {
  //     const value = editorRef.current.getValue()
  //     setEditorValue(value)
  //   }
  // }, [expandLevel])

  const handleEditorDidMount = (_: () => string, editor: any) => {
    console.log(editor)
    editorRef.current = editor
    //setEditorDidMount(true)
  }

  const handlePythonScript = async () => {
    const date = format(new Date(), dateFormat)
    const editor = editorRef?.current ?? null
    if (editor) {
      const script = editor.getValue() as string | undefined
      if (script && script.length) {
        try {
          const res = await postPythonScript(script)
          console.log(res)
          const json = JSON.stringify(res, null, 2)
          setOutputValue(
            outputValue + `${date}:~$ Success \r\n` + json + '\r\n',
          )
        } catch (err) {
          console.log(err)
          setOutputValue(outputValue + date + ':~$ ' + err + '\r\n')
        }
      }
    }
  }

  const handleEvalJavaScript = () => {
    const date = format(new Date(), dateFormat)
    const editor = editorRef?.current ?? null
    if (editor) {
      const script = editor.getValue() as string | undefined
      if (script && script.length) {
        try {
          const result = new Function(script)
          const response = result.call(null, 1)
          console.log(response)
          setOutputValue(outputValue + `${date}:~$ Success \r\n`)
        } catch (err) {
          console.log(err)
          setOutputValue(outputValue + date + ':~$ ' + err + '\r\n')
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
    <div className={className}>
      {initRender ? (
        <Editor
          loading={<div></div>}
          width="50%"
          height="100%"
          value={initialValue}
          editorDidMount={handleEditorDidMount}
          language="python"
          theme="dark"
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      ) : null}

      <Terminal outputValue={outputValue} onEvalScript={handlePythonScript} />
    </div>
  )
}

export default styled(FlowChartCodeEditor)`
  display: flex;
  height: 100%;
  position: relative;
  background: #202124;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
`

const editorCss = css`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
  > {
    height: inherit;
    flex: 1;
  }
`
