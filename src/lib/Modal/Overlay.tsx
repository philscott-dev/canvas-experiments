/** @jsx jsx */
import styled from '@emotion/styled'

export default styled.div<{ isVisible: boolean }>`
  z-index: 2;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.color.black[700]};
  opacity: ${({ isVisible }) => (isVisible ? 0.5 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: ${({ theme }) => theme.transition.all};
`
