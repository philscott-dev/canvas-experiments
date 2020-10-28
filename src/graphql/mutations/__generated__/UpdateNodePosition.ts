/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkflowNodePositionInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateNodePosition
// ====================================================

export interface UpdateNodePosition_updateWorkflowNodePosition {
  __typename: "WorkflowNode";
  id: string;
  x: number;
  y: number;
}

export interface UpdateNodePosition {
  updateWorkflowNodePosition: UpdateNodePosition_updateWorkflowNodePosition;
}

export interface UpdateNodePositionVariables {
  input: WorkflowNodePositionInput;
}
