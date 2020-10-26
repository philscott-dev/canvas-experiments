import styled from '@emotion/styled'

export const FlexLeft = styled.div`
  display: flex;
  align-items: center;
  > button {
    border-right: 1px solid ${({ theme }) => theme.color.indigo[600]};
    &:nth-of-type(1) {
      border-radius: 8px 0 0 8px;
    }
  }
`
