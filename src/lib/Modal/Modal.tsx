/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { IconButton } from '../IconButton'
import { H4 } from '../H4'
import { FiX } from 'react-icons/fi'
import Overlay from './Overlay'

interface ModalProps {
  title: string
  children: any
  isVisible: boolean
  onClose?: () => void
}

const Modal: FC<ModalProps> = ({ title, children, isVisible, onClose }) => {
  return (
    <>
      <Overlay isVisible={isVisible} />
      <Wrapper isVisible={isVisible}>
        <TitleBar>
          <Title>{title}</Title>
          {onClose ? (
            <IconButton color="gray" onMouseDown={onClose}>
              <FiX />
            </IconButton>
          ) : null}
        </TitleBar>
        {children}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div<{ isVisible: boolean }>`
  z-index: 2;
  padding: 0 40px 32px 40px;
  position: fixed;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  background: ${({ theme }) => theme.color.indigo[600]};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  min-width: 500px;
  transition: ${({ theme }) => theme.transition.all};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.xsmall}) {
    min-width: inherit;
    padding: 40px 64px;
    max-height: 100vh;
  }
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`

const Title = styled(H4)`
  margin-bottom: 0;
`

export default Modal
