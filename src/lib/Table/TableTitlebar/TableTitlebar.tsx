/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx } from '@emotion/react'
import { H4 } from 'lib'
import { TableBreadCrumbs } from '../TableBreadCrumbs'
import { BreadCrumb } from '../types'

interface TableTitlebarProps {
  className?: string
  title?: string
  subtitle?: string
  breadCrumbs: BreadCrumb[]
  onBaseBreadCrumbClick: () => void
  onBreadCrumbClick: (index: number, breadCrumb: BreadCrumb) => void
}

const TableTitlebar: FC<TableTitlebarProps> = ({
  className,
  title,
  subtitle,
  breadCrumbs,
  onBaseBreadCrumbClick,
  onBreadCrumbClick,
}) => {
  const handleBreadCrumbClick = (index: number, breadCrumb: BreadCrumb) => {
    onBreadCrumbClick(index, breadCrumb)
  }

  return (
    <div className={className}>
      <div>
        <H4>{title}</H4>
        <TableBreadCrumbs
          basePath={{ label: subtitle || '' }}
          paths={breadCrumbs}
          onBaseClick={onBaseBreadCrumbClick}
          onClick={handleBreadCrumbClick}
        />
      </div>
    </div>
  )
}

export default styled(TableTitlebar)`
  display: flex;
  justify-content: space-between;
`
