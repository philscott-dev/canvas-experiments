import { keyframes } from '@emotion/react'

export const fade = keyframes`
  0%   {
    visibility: hidden;
    opacity: 0;
  }
  50%  {

    visibility: visible;
    opacity: 1;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
`

export const fadeReverse = keyframes`
  0%   {
    visibility: visible;
    opacity: 1;
  }
  50%  {

    visibility: visible;
    opacity: 1;
  }
  100% {

    visibility: hidden;
    opacity: 0;
  }
`
