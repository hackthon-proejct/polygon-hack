/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_user_board_bounties {
  __typename: "Bounty";
  id: string;
  /**
   * The metadata attached to this bounty
   */
  metadata: any | null;
}

export interface UserQuery_user_board {
  __typename: "Board";
  id: string;
  bounties: (UserQuery_user_board_bounties | null)[] | null;
}

export interface UserQuery_user {
  __typename: "User";
  /**
   * The uuid of this user
   */
  id: string;
  /**
   * The user's bounty board
   */
  board: UserQuery_user_board | null;
}

export interface UserQuery {
  user: UserQuery_user | null;
}

export interface UserQueryVariables {
  id: string;
}
