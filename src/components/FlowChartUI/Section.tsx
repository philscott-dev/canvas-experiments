import styled from '@emotion/styled'
import { ExpandLevel } from 'enums'

export default styled.section<{ expandLevel: ExpandLevel }>`
  box-sizing: border-box;
  display: flex;
  flex: ${({ expandLevel }) => (expandLevel === ExpandLevel.FULL ? 0 : 1)};
  transition: all 0.25s ease-in-out;
`
