/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddWorkflowNodeInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddWorkflowNode
// ====================================================

export interface AddWorkflowNode_addWorkflowNode {
  __typename: "WorkflowNode";
  id: string;
  parentIds: string[];
  name: string;
  displayName: string;
  description: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  colorPrimary: string;
  colorSecondary: string;
}

export interface AddWorkflowNode {
  addWorkflowNode: AddWorkflowNode_addWorkflowNode;
}

export interface AddWorkflowNodeVariables {
  workflowNodeInput: AddWorkflowNodeInput;
}
