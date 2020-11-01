import { GetWorkflow_workflow_workflowNodes as WorkflowNode } from 'graphql/queries/__generated__/GetWorkflow'
import { Point } from 'types'
import { CONNECTOR_SIZE } from 'constants/canvas'

// the right side of a node
export const getConnectorPoint = (
  node: WorkflowNode,
  translateOffset?: Point,
) => {
  const hr = node.height / 2
  return {
    x: node.x + node.width + (translateOffset?.x ?? 0),
    y: node.y + hr + (translateOffset?.y ?? 0),
  }
}

// the left side of the node
export const getAdapterPoint = (
  node: WorkflowNode,
  translateOffset?: Point,
) => {
  const hr = node.height / 2
  return {
    x: node.x + (translateOffset?.x ?? 0),
    y: node.y + hr + (translateOffset?.y ?? 0),
  }
}

export const getConnectorRect = (connectorPoint: Point) => ({
  x: connectorPoint.x - CONNECTOR_SIZE / 2,
  y: connectorPoint.y - CONNECTOR_SIZE / 2,
  width: CONNECTOR_SIZE,
  height: CONNECTOR_SIZE,
})
