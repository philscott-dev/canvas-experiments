import styled from '@emotion/styled'

export default styled.div<{ color: string }>`
  flex: 1;
  padding: 4px;
  border-radius: 0 8px 8px 0;
  background: ${({ color }) => color};
`
