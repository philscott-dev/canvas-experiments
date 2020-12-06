/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { jsx, css } from '@emotion/react'
import { Text } from 'lib'
import { TableBreadCrumbs } from '../TableBreadCrumbs'
import { BreadCrumb } from '../types'
import { Flex } from 'lib/Flex'
import HeadingIcon from './HeadingIcon'

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
      <Flex>
        <HeadingIcon />
        <div>
          <Text
            size="large"
            css={css`
              text-transform: uppercase;
            `}
          >
            {title}
          </Text>
          <TableBreadCrumbs
            basePath={{ label: subtitle || '' }}
            paths={breadCrumbs}
            onBaseClick={onBaseBreadCrumbClick}
            onClick={handleBreadCrumbClick}
          />
        </div>
      </Flex>
    </div>
  )
}

export default styled(TableTitlebar)`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 40px;
`
