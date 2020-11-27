/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, MouseEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { Text } from 'lib'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { theme } from 'theme'

interface ServiceLinkCountProps {
  className?: string
  count?: number
  isCollapsed: boolean
  onMouseDown: (e: MouseEvent) => void
}

const ServiceLinkCount: FC<ServiceLinkCountProps> = ({
  className,
  count,
  isCollapsed,
  onMouseDown,
}) => {
  return (
    <button className={className} onMouseDown={onMouseDown}>
      <Text.Deemphasized size="small">{count || 0} Items</Text.Deemphasized>
      {isCollapsed ? (
        <FiChevronDown css={iconCss} />
      ) : (
        <FiChevronUp css={iconCss} />
      )}
    </button>
  )
}

export default styled(ServiceLinkCount)`
  display: flex;
  flex-grow: 0;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    > * {
      color: ${({ theme }) => theme.color.blue[300]};
      transition: all 0.25s ease-in-out;
    }
  }
`

const iconCss = css`
  margin-left: 8px;
  margin-top: 2px;
  color: ${theme.color.gray[300]};
`
