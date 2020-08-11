import styled from '@emotion/styled'

export default styled.div<{ color: string }>`
  height: 48px;
  width: 48px;
  min-width: 48px;
  max-width: 48px;
  border-radius: 8px 0 0 8px;
  background: ${({ color }) => color};
`
