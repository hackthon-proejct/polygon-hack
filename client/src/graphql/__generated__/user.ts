/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: user
// ====================================================

export interface user_user {
  __typename: "User";
  /**
   * The uuid of this user
   */
  id: string;
}

export interface user {
  user: user_user | null;
}

export interface userVariables {
  id: string;
}
