import styled from '@emotion/styled'
import Input from 'lib/FormElements/Input'

export default styled(Input)`
  border: none;
  background: ${({ theme }) => theme.color.indigo[600]};
  &:focus {
    border: none;
  }
`
