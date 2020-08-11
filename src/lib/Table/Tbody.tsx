import styled from '@emotion/styled'

interface TbodyProps {
  isScrollable?: boolean
}

const Tbody = styled.div<TbodyProps>`
  position: relative;
  display: table-row-group;
  width: 100%;
  overflow-y: ${({ isScrollable }) => (isScrollable ? 'auto' : 'unset')};
`

export default Tbody
