import { Theme } from '@emotion/react'

export namespace Size {
  export type xxsmall = 'xxsmall'
  export type xsmall = 'xsmall'
  export type small = 'small'
  export type medium = 'medium'
  export type large = 'large'
  export type xlarge = 'xlarge'
  export type xxlarge = 'xxlarge'
}

export namespace Variant { 
  export type primary = 'primary'
  export type secondary = 'secondary'
  export type tertiary = 'tertiary' 
  export type light = 'light' 
  export type dark = 'dark'
}

export namespace Weight {
  export type normal = 'normal'
  export type emphasized = 'emphasized'
  export type superEmphasized = 'superEmphasized' 
  export type deemphasized = 'deemphasized' 
  export type light = 'light'
}

export type Styles<K> = Record<K, SerializedStyles> 


export type Circle = { x: number; y: number; radius: number }
export type Point = { x: number; y: number }
export type Rect = { x: number; y: number; width: number; height: number }
export interface Radius {
  tl: number
  tr: number
  br: number
  bl: number
}

export type BaseNodeType = 'service'

export type BaseNode = {
  id: string
  type: BaseNodeType
  name: string
  displayName: string
  colorPrimary: string
  colorSecondary: string
  url?: string
}

export interface RectNode extends BaseNode {
  rect: Rect
}





