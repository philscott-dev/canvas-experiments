/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddWorkflowInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddWorkflow
// ====================================================

export interface AddWorkflow_addWorkflow {
  __typename: "WorkFlow";
  id: string;
  /**
   * The title of the workflow.
   */
  title: string;
  /**
   * Short summary of the workflow.
   */
  description: string;
  /**
   * Node ID that the workflow starts on.
   */
  startId: string;
  /**
   * Node ID that the workflow terminates on.
   */
  endId: string;
}

export interface AddWorkflow {
  addWorkflow: AddWorkflow_addWorkflow;
}

export interface AddWorkflowVariables {
  workflow: AddWorkflowInput;
}
