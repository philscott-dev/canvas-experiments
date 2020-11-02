/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkflowNodeParentInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateNodeParent
// ====================================================

export interface UpdateNodeParent_updateWorkflowNodeParent {
  __typename: "WorkflowNode";
  id: string;
  parentId: string | null;
}

export interface UpdateNodeParent {
  updateWorkflowNodeParent: UpdateNodeParent_updateWorkflowNodeParent;
}

export interface UpdateNodeParentVariables {
  input: WorkflowNodeParentInput;
}
