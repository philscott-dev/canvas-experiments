import styled from '@emotion/styled'
import { fade, fadeReverse } from './animation/fade'
import { Animation } from './animation/enum'

export default styled.div<{ isVisible: Animation }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  > * {
    animation-name: ${({ isVisible }) =>
      isVisible !== Animation.NONE
        ? isVisible === Animation.IN
          ? fade
          : fadeReverse
        : null};
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
`
