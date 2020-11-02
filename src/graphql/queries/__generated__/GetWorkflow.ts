/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWorkflow
// ====================================================

export interface GetWorkflow_workflow_workflowNodes {
  __typename: "WorkflowNode";
  id: string;
  parentId: string | null;
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
   * List of  Workflow Nodes in the workflow.
   */
  workflowNodes: GetWorkflow_workflow_workflowNodes[];
}

export interface GetWorkflow {
  workflow: GetWorkflow_workflow;
}

export interface GetWorkflowVariables {
  id: number;
}
