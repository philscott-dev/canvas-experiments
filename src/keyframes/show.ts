import { keyframes } from '@emotion/react'

export const show = keyframes`
  0%   {
    display: none;
  }
  50%  {
    display: none;
  }
  100% {
    display: initial;
  }
`

export const hide = keyframes`
  0%   {
    display: initial;
  }
  50%  {
    display: initial;
  }
  100% {
    display: none;
  }
`
