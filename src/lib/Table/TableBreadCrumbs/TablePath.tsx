/** @jsx jsx */
import { FC } from 'react'
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/react'
import { FiHome } from 'react-icons/fi'
import { Anchor } from 'lib/Anchor'
import Slash from './Slash'
import { BreadCrumb } from '../types'

interface TablePathProps {
  className?: string
  label: string
  href?: string
  index: number
  onClick: (index: number, breadCrumb: BreadCrumb) => void
}

const TablePath: FC<TablePathProps> = ({
  label,
  href,
  index,
  onClick,
  className,
}) => {
  const handleClick = () => {
    onClick(index, { label, href })
  }
  return (
    <div className={className}>
      <Slash />
      <Anchor
        aria-label="Home"
        href={href}
        size="small"
        css={anchorCss}
        onMouseDown={handleClick}
      >
        {label}
      </Anchor>
    </div>
  )
}

export default styled(TablePath)`
  display: flex;
  > a {
    font-weight: 500;
    color: ${({ theme }) => theme.color.gray[300]};
  }
`

const anchorCss = css`
  display: flex;
  align-items: center;
  line-height: unset;
  text-transform: uppercase;
  text-decoration: none;
`
