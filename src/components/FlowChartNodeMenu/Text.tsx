import styled from '@emotion/styled'

export default styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.white[100]};
  font-family: ${({ theme }) => theme.font.family};
`
