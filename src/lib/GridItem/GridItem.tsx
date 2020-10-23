/** @jsx jsx */
import styled from '@emotion/styled'
import { forwardRef, MouseEvent } from 'react'
import { jsx } from '@emotion/react'
import { H4, Text, Anchor } from 'lib'
import { useRouter } from 'next/router'

interface ListItemProps {
  className?: string
  title: string
  subtitle: string
  date?: string
  isEmpty?: boolean
  img?: string
  href?: string
  height?: number
  width?: number
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}
const GridItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  (
    {
      className,
      title,
      subtitle,
      href,
      date,
      img,
      height,
      width,
      onClick,
      isEmpty = false,
    },
    ref,
  ) => {
    return (
      <Anchor className={className} ref={ref} href={href}>
        <Content>
          <div>
            <H4>{title}</H4>
            <Text.Deemphasized size="small">{subtitle}</Text.Deemphasized>
          </div>
        </Content>
        <Box img={img}></Box>
        <Content>
          {date ? (
            <Text.Deemphasized size="small">{date}</Text.Deemphasized>
          ) : null}

          {height && width ? (
            <Text.Deemphasized size="small">
              {height} x {width}
            </Text.Deemphasized>
          ) : null}
        </Content>
      </Anchor>
    )
  },
)

export default styled(GridItem)`
  flex: 1;
  flex-grow: 1;
  min-width: 200px;
  padding: 24px;
`

const Box = styled.div<{ img?: string; isEmpty?: boolean }>`
  position: relative;
  width: 100%;
  padding-top: 100%;
  height: 0;
  flex: 1;
  border-radius: 16px;
  border-color: ${({ theme }) => theme.color.indigo[300]};
  border-style: ${({ isEmpty }) => (isEmpty ? 'dashed' : 'solid')};
  background: ${({ theme, img }) =>
    `url("http://192.168.1.185:8080/${img}"), ${theme.color.indigo[400]}  `};
  background-size: cover, contain;
  background-position: center, right bottom;
  background-repeat: no-repeat, no-repeat;
  opacity: 0.8;

  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  transition: all 0.25s ease-in-out;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 16px 0;
  opacity: 1;
`
