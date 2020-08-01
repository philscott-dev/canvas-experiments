export type Circle = { x: number; y: number; radius: number }
export type Point = { x: number; y: number }
export type Rect = { x: number; y: number; width: number; height: number }

export type BaseNodeType = 'service'

export type BaseNode = {
  id: string
  type: BaseNodeType
  name: string
  displayName: string
  colorPrimary: string
  colorSecondary: string
}

export interface RectNode extends BaseNode {
  rect: Rect
}
