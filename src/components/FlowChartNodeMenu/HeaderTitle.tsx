import styled from '@emotion/styled'

export default styled.span`
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  & > svg {
    margin-right: 8px;
    stroke: ${({ theme }) => theme.color.white[100]};
    font-size: 14px;
    & > path {
      stroke: ${({ theme }) => theme.color.white[100]};
    }
  }
`
