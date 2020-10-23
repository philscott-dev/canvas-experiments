/** @jsx jsx */
import styled from '@emotion/styled'
import { FC } from 'react'
import { css, jsx } from '@emotion/react'
import { Text } from 'lib'
import { IconButton } from 'lib/IconButton'

interface EmptyStateProps {
  className?: string
  onClick: () => void
}

const EmptyState: FC<EmptyStateProps> = ({ className, onClick }) => {
  return (
    <div className={className}>
      <Text size="large">No Results. Please refine your search or </Text>
      <Text>&nbsp;</Text>
      <Text.Emphasized
        size="large"
        onMouseDown={onClick}
        css={css`
          cursor: pointer;
        `}
      >
        {' '}
        Add a Workflow +
      </Text.Emphasized>
    </div>
  )
}

export default styled(EmptyState)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
  margin-top: 64px;
`
