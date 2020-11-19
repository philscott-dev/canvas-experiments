import styled from '@emotion/styled'

interface ServiceLinkIconProps {
  className?: string
  color: string
  count?: number
}

const ServiceLinkIcon = styled.div<ServiceLinkIconProps>`
  box-sizing: border-box;
  margin-right: 16px;
  margin-top: 3px;
  width: 16px;
  height: 16px;
  border-radius: 20px;
  border-style: solid;
  border-width: 4px;
  border-color: ${({ color }) => color};
  background: ${({ count, color }) =>
    count && count > 0 ? color : 'transparent'};
`

export default ServiceLinkIcon
