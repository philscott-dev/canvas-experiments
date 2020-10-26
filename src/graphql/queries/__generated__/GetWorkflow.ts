/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWorkflow
// ====================================================

export interface GetWorkflow_workflow_nodes {
  __typename: "Node";
  id: string;
  parentId: string;
  name: string;
  createdDate: any;
  updatedDate: any;
}

export interface GetWorkflow_workflow {
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
  startId: string | null;
  /**
   * List of Nodes in the workflow.
   */
  nodes: GetWorkflow_workflow_nodes[];
}

export interface GetWorkflow {
  workflow: GetWorkflow_workflow;
}

export interface GetWorkflowVariables {
  id: string;
}
