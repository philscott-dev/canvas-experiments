/** @jsx jsx */
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/react'
import { FC, MouseEvent } from 'react'
import ServiceLinkIcon from './ServiceLinkIcon'
import { Text, Anchor } from 'lib'
import ServiceLinkCount from './ServiceLinkCount'

interface ServiceLinkHeadingProps {
  className?: string
  title: string
  subtitle?: string
  showCount?: boolean
  count?: number
  color: string
  isCollapsed: boolean
  onMouseDown: (e: MouseEvent) => void
}

const ServiceLinkHeading: FC<ServiceLinkHeadingProps> = ({
  className,
  title,
  subtitle,
  showCount = true,
  count,
  color,
  isCollapsed,
  onMouseDown,
}) => {
  return (
    <div className={className}>
      <div css={wrapperCss}>
        <ServiceLinkIcon color={color} count={count} />
        <div>
          <Anchor onMouseDown={onMouseDown}>{title}</Anchor>
          <Text.Deemphasized size="small">{subtitle}</Text.Deemphasized>
        </div>
      </div>
      {showCount ? (
        <ServiceLinkCount
          count={count}
          isCollapsed={isCollapsed}
          onMouseDown={onMouseDown}
        />
      ) : null}
    </div>
  )
}

export default styled(ServiceLinkHeading)`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-bottom: 12px;
`

const wrapperCss = css`
  display: flex;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
`
