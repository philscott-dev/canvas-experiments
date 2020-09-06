/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { H4 } from 'lib'
import { TableBreadCrumbs } from '../TableBreadCrumbs'

interface TableTitlebarProps {
  className?: string
  title?: string
  subtitle?: string
  onBreadCrumbClick: () => void
}

const TableTitlebar: FC<TableTitlebarProps> = ({
  className,
  title,
  subtitle,
  onBreadCrumbClick,
}) => {

  const handleBreadCrumbClick = () => {
    onBreadCrumbClick()
  }

  return (
    <div className={className}>
      <div>
        <H4>{title}</H4>
        <TableBreadCrumbs
          basePath={{ label: 'Service Subtitle' }}
          paths={[{ label: 'Dollar Ammount' }, { label: 'things' }]}
          onClick={handleBreadCrumbClick}
        />
      </div>
    </div>
  )
}

export default styled(TableTitlebar)`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`
