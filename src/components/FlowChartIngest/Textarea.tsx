import styled from '@emotion/styled'

export default styled.textarea`
  resize: none;
  height: 100%;
  outline: none;
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 8px;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.gray[600]};
`
