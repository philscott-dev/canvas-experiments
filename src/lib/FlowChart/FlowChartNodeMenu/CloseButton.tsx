import styled from '@emotion/styled'
import { IconButton } from 'lib'

export default styled(IconButton)`
  &:hover {
    & * {
      color: ${({ theme }) => theme.color.gray[200]};
    }
  }
`
