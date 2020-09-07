/** @jsx jsx */
import { FC } from 'react'
import { css, jsx } from '@emotion/react'
import { FiHome } from 'react-icons/fi'
import { Anchor } from 'lib/Anchor'

const TableBasePath: FC<{
  label: string
  href?: string
  onClick: () => void
}> = ({ label, href, onClick }) => {
  return (
    <Anchor
      aria-label="Home"
      href={href}
      onMouseDown={onClick}
      size="small"
      css={anchorCss}
    >
      {label?.length ? label : <FiHome />}
    </Anchor>
  )
}

const anchorCss = css`
  display: flex;
  align-items: center;
  line-height: unset;
  text-transform: uppercase;
  text-decoration: none;
`

export default TableBasePath
