import styled from '@emotion/styled'

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  pointer-events: all;
  min-height: 40px;
  max-height: 40px;
  background: ${({ theme }) => theme.color.indigo[400]};
`

export default Bar
