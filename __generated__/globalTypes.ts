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
  parentId?: string | null;
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

/**
 * Workflow Node connector
 */
export interface WorkflowNodeParentInput {
  workflowId: string;
  parentId?: string | null;
  id: string;
}

/**
 * Create Workflow Node
 */
export interface WorkflowNodePositionInput {
  workflowId: string;
  id: string;
  x: number;
  y: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
