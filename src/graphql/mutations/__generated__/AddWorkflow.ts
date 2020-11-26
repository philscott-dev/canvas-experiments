/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddWorkflowInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddWorkflow
// ====================================================

export interface AddWorkflow_addWorkflow {
  __typename: "Workflow";
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
  startId: string | null;
  /**
   * Node ID that the workflow terminates on.
   */
  endId: string | null;
}

export interface AddWorkflow {
  addWorkflow: AddWorkflow_addWorkflow;
}

export interface AddWorkflowVariables {
  input: AddWorkflowInput;
}
