import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import styled from '@emotion/styled'
import { ChangeEvent, FC, useState } from 'react'
import Heading from './Heading'
import Textarea from './Textarea'
import { Button } from 'lib'
import { parseByNewline } from 'helpers/parse'

interface FlowChartDataLinkSidebarProps {
  className?: string
  parentNodes?: WorkflowNode[] | undefined
  activeNode?: WorkflowNode
  onParse: (parsed: string[]) => void
}
const FlowChartDataLinkSidebar: FC<FlowChartDataLinkSidebarProps> = ({
  className,
  parentNodes,
  activeNode,
  onParse,
}) => {
  const [text, setText] = useState('')
  const handleParse = () => {
    const parsed = parseByNewline(text)
    setText('')
    onParse(parsed)
  }

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value)
  }
  return (
    <div className={className}>
      <Heading serviceCount={parentNodes?.length ?? 0} />
      <ParseButton onClick={handleParse}>Parse Text</ParseButton>
      <Textarea
        value={text}
        name={'parser'}
        placeholder={'Add values by new line'}
        onChange={handleTextareaChange}
      />
    </div>
  )
}

export default styled(FlowChartDataLinkSidebar)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 336px;
  max-width: 336px;
  background: #202124;
  overflow-y: auto;
  padding: 0 24px;
`

const ParseButton = styled(Button.Primary)`
  box-shadow: none;
  margin-bottom: 16px;
  font-family: ${({ theme }) => theme.font.family};
  padding: 12px;
  &:hover {
    box-shadow: none;
  }
`
