import styled from '@emotion/styled'

interface TbodyProps {
  isScrollable?: boolean
}

const Tbody = styled.tbody<TbodyProps>`
  overflow-y: ${({ isScrollable }) => (isScrollable ? 'auto' : 'unset')};
`

export default Tbody
