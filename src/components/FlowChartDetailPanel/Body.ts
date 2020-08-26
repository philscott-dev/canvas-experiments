import styled from '@emotion/styled'
import { ExpandLevel } from 'enums'

const Body = styled.div<{ expandLevel: ExpandLevel }>`
  display: initial;
  box-sizing: border-box;
  pointer-events: all;
  height: initial;
  flex: 1;
  background: ${({ theme }) => theme.color.blue[700] + 'f7'};
  max-height: ${({ expandLevel }) =>
    expandLevel !== ExpandLevel.NONE
      ? 'calc(100% - 40px)' /* Subtract 40px for the bar */
      : 0};
  transition: all 0.25s ease-in-out;
`
export default Body
