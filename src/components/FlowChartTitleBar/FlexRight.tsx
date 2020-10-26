import styled from '@emotion/styled'

export const FlexRight = styled.div`
  display: flex;
  align-items: center;
  > button {
    border-left: 1px solid ${({ theme }) => theme.color.indigo[600]};
    &:nth-last-of-type(1) {
      border-radius: 0 8px 8px 0;
    }
  }
`
