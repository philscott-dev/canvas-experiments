/** @jsx jsx */
import { FC } from 'react'
import { css, jsx } from '@emotion/react'
import { FiHome } from 'react-icons/fi'
import { Anchor } from 'lib/Anchor'
import Slash from './Slash'

const TablePath: FC<{ label: string; href?: string }> = ({ label, href }) => {
  return (
    <>
      <Slash />
      <Anchor aria-label="Home" href={href} size="small" css={anchorCss}>
        {label}
      </Anchor>
    </>
  )
}

const anchorCss = css`
  display: flex;
  align-items: center;
  line-height: unset;
  text-transform: uppercase;
  text-decoration: none;
`

export default TablePath
