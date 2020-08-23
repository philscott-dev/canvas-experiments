import styled from '@emotion/styled'

export const FlexLeft = styled.div`
  display: flex;
  align-items: center;
  > button {
    border-right: 1px solid ${({ theme }) => theme.color.indigo[600]};
  }
`

export const FlexRight = styled.div`
  display: flex;
  align-items: center;
  > button {
    border-left: 1px solid ${({ theme }) => theme.color.indigo[600]};
  }
`
