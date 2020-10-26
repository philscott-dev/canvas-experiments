/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddNodeInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddNode
// ====================================================

export interface AddNode_addNode {
  __typename: "WorkFlow";
  id: string;
}

export interface AddNode {
  addNode: AddNode_addNode;
}

export interface AddNodeVariables {
  nodeInput: AddNodeInput;
}
