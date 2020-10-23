declare module 'svg-loaders-react' {
  import type { FC } from 'react'
  interface Props {
    stroke: string
    strokeOpacity?: string
    viewBox?: string
  }

  export const Audio: FC<Props>
  export const BallTriangle: FC<Props>
  export const Bars: FC<Props>
  export const Circles: FC<Props>
  export const Grid: FC<Props>
  export const Hearts: FC<Props>
  export const Oval: FC<Props>
  export const Rings: FC<Props>
  export const SpinningCircles: FC<Props>
  export const TailSpin: FC<Props>
  export const ThreeDots: FC<Props>
}
