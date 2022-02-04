/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryUser
// ====================================================

export interface QueryUser_user {
  __typename: "User";
  /**
   * The uuid of this user
   */
  id: string;
}

export interface QueryUser {
  user: QueryUser_user | null;
}

export interface QueryUserVariables {
  id: string;
}
