import React, { FC } from 'react'
import styled from '@emotion/styled'
import TableBasePath from './TableBasePath'
import TablePath from './TablePath'

type Path = {
  label: string
  href?: string
}
interface TableBreadCrumbsProps {
  basePath: Path
  paths?: Path[]
  onClick: () => void
}

const TableBreadCrumbs: FC<TableBreadCrumbsProps> = ({ basePath, paths }) => {
  return (
    <Container>
      <TableBasePath label={basePath?.label} href={basePath?.href} />
      {paths?.map((path, index) => (
        <TablePath key={index} href={path.href} label={path.label} />
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
