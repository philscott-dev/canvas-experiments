/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState, useEffect } from 'react'
import { jsx } from '@emotion/react'
import { splitAndUpperCase } from 'helpers/string'
import RowExpandTitle from './RowExpandTitle'
import RowExpandValue from './RowExpandValue'

interface RowExpandSectionProps {
  className?: string
  index?: number
  cellKey?: string
  expandKey: string
  data?: { [key: string]: any }
  onExpand: (key: string, index?: number) => void
}
const RowExpandSection: FC<RowExpandSectionProps> = ({
  className,
  index,
  data,
  cellKey,
  expandKey,
  onExpand,
}) => {
  const [title, setTitle] = useState('')
  useEffect(() => {
    setTitle(splitAndUpperCase(cellKey || ''))
  }, [cellKey])

  return (
    <section className={className}>
      <RowExpandTitle>{title}</RowExpandTitle>
      <div>
        {data
          ? Object.keys(data).map((key, i) => (
              <RowExpandValue
                key={i}
                index={index}
                cellKey={key}
                expandKey={expandKey}
                value={data[key]}
                onExpand={onExpand}
              />
            ))
          : null}
      </div>
    </section>
  )
}

export default styled(RowExpandSection)`
  box-sizing: border-box;
  padding: 6px;
  background: ${({ theme }) => theme.color.indigo[300]};
  border-bottom: 1px solid ${({ theme }) => theme.color.indigo[600]};
  &:nth-last-of-type(1) {
    border-radius: 0 0 8px 8px;
    border-bottom: none;
  }
`
