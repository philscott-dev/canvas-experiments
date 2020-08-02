import styled from '@emotion/styled'
import { IconButton } from 'lib'

export default styled(IconButton)`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 40px;
  padding: 0 16px;
  &:hover {
    background: ${({ theme }) => theme.color.indigo[300]};
    & * {
      color: ${({ theme }) => theme.color.white[100]};
    }
  }
  transition: all 0.25s ease-in-out;
`
