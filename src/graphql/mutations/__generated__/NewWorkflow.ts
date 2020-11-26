/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewWorkflow
// ====================================================

export interface NewWorkflow {
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
