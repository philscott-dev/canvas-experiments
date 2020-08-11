/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx, css } from '@emotion/react'
import { splitAndCapitalize } from 'helpers/string'
import { IconButton } from 'lib'
import { FiMoreVertical } from 'react-icons/fi'

export interface ThProps {
  onClick?: (key: string) => void
  heading: string
  className?: string
}

const Th: FC<ThProps> = ({ heading, onClick, className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(heading)
    }
  }
  return (
    <div className={className} onClick={handleClick}>
      <Wrapper>
        <IconButton>
          <FiMoreVertical
            css={css`
              margin-left: -3px;
              margin-right: 2px;
            `}
          />
        </IconButton>
        {splitAndCapitalize(heading)}
      </Wrapper>
    </div>
  )
}

export default styled(Th)`
  display: table-cell;
  padding: 12px;
  padding-bottom: 16px;
  font-weight: 500;
  font-size: 12px;
  text-align: left;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`
