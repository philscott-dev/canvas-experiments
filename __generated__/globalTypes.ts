/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Create Workflow
 */
export interface AddWorkflowInput {
  title: string;
  description?: string | null;
}

/**
 * Create Workflow Node
 */
export interface AddWorkflowNodeInput {
  workflowId: string;
  nodeId: string;
  name: string;
  displayName: string;
  description?: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  colorPrimary: string;
  colorSecondary: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
