/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useEffect, useState } from 'react'
import { jsx, css } from '@emotion/react'
import { splitCamalized } from 'helpers/string'
import { IconButton } from 'lib'
import { FiMoreVertical } from 'react-icons/fi'
import { ExtraTableData } from './types'

export interface ThProps {
  onClick?: (key: string) => void
  heading: string
  extraData?: ExtraTableData
  className?: string
}

const Th: FC<ThProps> = ({ heading, extraData, onClick, className }) => {
  const [elem, setElem] = useState<string | JSX.Element>()
  useEffect(() => {
    if (extraData && extraData[heading] && extraData[heading].heading) {
      setElem(extraData[heading].heading())
    } else {
      setElem(splitCamalized(heading).join(' '))
    }
  }, [heading, extraData])
  const handleClick = () => {
    if (onClick) {
      onClick(heading)
    }
  }
  return (
    <th className={className} onClick={handleClick}>
      <Wrapper>
        <IconButton>
          <FiMoreVertical
            css={css`
              margin-left: -3px;
              margin-right: 2px;
            `}
          />
        </IconButton>
        {elem}
      </Wrapper>
    </th>
  )
}

export default styled(Th)`
  padding: 12px;
  padding-bottom: 16px;
  font-weight: 500;
  font-size: 12px;
  border: 0;
  text-align: left;
  white-space: nowrap;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.gray[200]};
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`
