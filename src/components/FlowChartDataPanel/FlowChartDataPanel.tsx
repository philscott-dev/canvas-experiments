import styled from '@emotion/styled'
import { createElement, FC, MouseEvent, useRef } from 'react'
import { Table } from 'lib'
import { mock } from './mock'
import FlowChartDataLinkSidebar from '../FlowChartDataLinkSidebar'
import { CellClickFunction, CellState } from 'lib/Table/types'
import { useOnClickOutside } from 'hooks'

interface FlowChartDataPanelProps {
  className?: string
}

const FlowChartDataPanel: FC<FlowChartDataPanelProps> = ({ className }) => {
  const handleCellClick: CellClickFunction = (
    e,
    _key,
    _expandable,
    _rowIndex,
    _expandIndex,
    cellData,
  ) => {
    console.log(_key, _expandable, cellData)
  }

  const handleChange = () => {
    console.log('yo')
  }

  const shouldRender = () => {}

  const onCheck = () => {}

  const handleDropdownClick = (
    e: MouseEvent<HTMLButtonElement>,
    cell: CellState,
  ) => {
    console.log(e.currentTarget.value)
    console.log(cell)
  }

  const renderOptions = () => {}

  return (
    <div className={className}>
      <Wrapper>
        <Container>
          <Table
            title="DYNAMIC SERVICE NAME"
            subtitle="HOME PATH"
            data={mock}
            onCellClick={handleCellClick}
            cellDropdown={{
              shouldRender: () => true,
              title: () => 'Send To:',
              options: (cell) => [{ text: 'Option', value: 'something' }],
              onClick: handleDropdownClick,
            }}
          />
        </Container>
      </Wrapper>
      <FlowChartDataLinkSidebar />
    </div>
  )
}

export default styled(FlowChartDataPanel)`
  display: flex;
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 24px;
`

const Container = styled.section`
  flex: 1;
  overflow: auto;
`
