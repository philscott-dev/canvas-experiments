import styled from '@emotion/styled'

export default styled.h3`
  padding: 0;
  margin-top: 6px;
  margin-bottom: 12px;
  margin-left: 6px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.color.white[100]};
  font-family: ${({ theme }) => theme.font.family};
`
