import styled from '@emotion/styled'

const Page = styled.div`
  padding: 0 48px;
  box-sizing: border-box;
  position: relative;
  margin: 48px auto 64px auto;
  max-width: ${({ theme }) => theme.breakpoint.large};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    padding: 0 4px;
  }
`

export default Page
