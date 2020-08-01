/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

interface SearchInputProps {
  className?: string
}
const SearchInput: FC<SearchInputProps> = ({ className }) => {
  return (
    <div className={className}>
      <Input type="text" placeholder="Search" className={className} />
    </div>
  )
}

export default styled(SearchInput)`
  position: relative;
  margin-bottom: 8px;
  padding: 0 16px;
  box-sizing: border-box;
`

const Input = styled.input`
  -webkit-appearance: none;
  ::-webkit-calendar-picker-indicator {
    display: none;
  }
  box-sizing: border-box;
  height: 40px;
  padding: 0 24px;
  border-radius: 1px;
  outline: none;
  width: 100%;
  font-size: 14px;
  background-clip: padding-box;
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 200;
  border: none;
  color: ${({ theme }) => theme.color.white[100]};
  background: ${({ theme }) => theme.color.indigo[300]};
  &::placeholder {
    color: ${({ theme }) => theme.color.gray[200]};
    font-family: ${({ theme }) => theme.font.family};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: ${({ theme }) => theme.color.indigo[300]};
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  &:focus {
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    border-right: 1px solid ${({ theme }) => theme.color.white[100]};
  }
  transition: all 0.3s ease-in-out;
`
