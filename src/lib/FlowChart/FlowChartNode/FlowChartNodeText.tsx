import styled from '@emotion/styled'

export default styled.p`
  margin: 4px 0 0 8px;
  padding: 0;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.white[100]};
  font-family: ${({ theme }) => theme.font.family};
`
