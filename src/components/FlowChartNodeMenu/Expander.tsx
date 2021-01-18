import styled from '@emotion/styled'
import { dropOpen, dropOpenReverse } from './animation/dropOpen'
import { Animation } from './animation/enum'
import { keyframes } from '@emotion/react'

export default styled.div<{ isVisible: Animation; offset?: number }>`
  display: flex;
  flex-direction: column;
  pointer-events: all;
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  height: 40px;
  width: 0;
  top: ${({ offset }) => `${offset}px`};
  border-radius: 8px;
  background: ${({ theme }) => theme.color.indigo[400]};
  animation-name: ${({ isVisible, offset = 0 }) =>
    isVisible
      ? isVisible === Animation.IN
        ? keyframes` //dropOpen 
          0%   {
            top: ${offset}px;
            height: 40px;
            width: 0;
            box-shadow: none;
          }
          50%  {
            top: ${offset}px;
            height: 40px;
            width: 256px;
            box-shadow: none;
          }
          100% {
            top: 0;
            height: 100%;
            width: 256px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          }
        `
        : keyframes` //dropOpenReverse
          0% {
            top: 0;
            height: 100%;
            width: 256px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          }
          50%  {
            top: ${offset}px;
            height: 40px;
            width: 256px;
            box-shadow: none;
          } 
          100%   {
            top: ${offset}px;
            height: 40px;
            width: 0;
            box-shadow: none;
          }
`
      : null};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`
