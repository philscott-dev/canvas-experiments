/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllWorkflows
// ====================================================

export interface GetAllWorkflows_workflows {
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
   * Date the workflow was created.
   */
  createdDate: any;
  /**
   * Date the workflow was last updated.
   */
  updatedDate: any;
}

export interface GetAllWorkflows {
  workflows: GetAllWorkflows_workflows[];
}
