import styled from '@emotion/styled'
import { dropOpen, dropOpenReverse } from './animation/dropOpen'
import { Animation } from './animation/enum'

export default styled.div<{ isVisible: Animation }>`
  display: flex;
  flex-direction: column;
  pointer-events: all;
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  height: 40px;
  width: 0;
  top: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.color.indigo[400]};
  animation-name: ${({ isVisible }) =>
    isVisible
      ? isVisible === Animation.IN
        ? dropOpen
        : dropOpenReverse
      : null};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`
