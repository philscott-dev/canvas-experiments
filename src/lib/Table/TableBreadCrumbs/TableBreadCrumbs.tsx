import React, { FC } from 'react'
import styled from '@emotion/styled'
import TableBasePath from './TableBasePath'
import TablePath from './TablePath'
import { BreadCrumb } from '../types'

interface TableBreadCrumbsProps {
  basePath: BreadCrumb
  paths?: BreadCrumb[]
  onClick: (index: number, breadCrumb: BreadCrumb) => void
  onBaseClick: () => void
}

const TableBreadCrumbs: FC<TableBreadCrumbsProps> = ({
  basePath,
  paths,
  onClick,
  onBaseClick,
}) => {
  return (
    <Container>
      <TableBasePath
        label={basePath?.label}
        href={basePath?.href}
        onClick={onBaseClick}
      />
      {paths?.map((path, index) => (
        <TablePath
          key={index}
          index={index}
          href={path.href}
          label={path.label}
          onClick={onClick}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  border-bottom: 1px solid ${({ theme }) => theme.color.blue[700]};
  margin-bottom: 32px;
`

export default TableBreadCrumbs
