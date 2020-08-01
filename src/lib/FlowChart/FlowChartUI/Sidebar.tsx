import styled from '@emotion/styled'

export const SidebarLeft = styled.div`
  box-sizing: border-box;
  min-width: 304px;
  max-width: 304px;
  padding: 24px;
`

export const SidebarRight = styled.div`
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  min-width: 304px;
  max-width: 304px;
  padding: 24px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.medium}) {
    font-size: 14px;
    line-height: 18px;
    min-width: unset;
    max-width: unset;
  }
`
