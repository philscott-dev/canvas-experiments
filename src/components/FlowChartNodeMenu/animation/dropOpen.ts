import { keyframes } from '@emotion/react'

export const dropOpen = keyframes`
  0%   {
    height: 40px;
    width: 0;
    box-shadow: none;
  }
  50%  {
    top: 56px;
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

export const dropOpenReverse = keyframes`
  0% {
    top: 0;
    height: 100%;
    width: 256px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  50%  {
    top: 56px;
    height: 40px;
    width: 256px;
    box-shadow: none;
  } 
  100%   {
    height: 40px;
    width: 0;
    box-shadow: none;
  }
`
