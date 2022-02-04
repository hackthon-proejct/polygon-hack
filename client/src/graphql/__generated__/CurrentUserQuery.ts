/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUserQuery
// ====================================================

export interface CurrentUserQuery_currentUser_board_bounties {
  __typename: "Bounty";
  /**
   * The funder that initiated this bounty
   */
  initiator_id: string;
  /**
   * The creator who can claim this bounty
   */
  creator_id: string;
  id: string;
  /**
   * The metadata attached to this bounty
   */
  metadata: any | null;
}

export interface CurrentUserQuery_currentUser_board {
  __typename: "Board";
  id: string;
  bounties: (CurrentUserQuery_currentUser_board_bounties | null)[] | null;
}

export interface CurrentUserQuery_currentUser {
  __typename: "User";
  /**
   * The uuid of this user
   */
  id: string;
  /**
   * The user's bounty board
   */
  board: CurrentUserQuery_currentUser_board | null;
}

export interface CurrentUserQuery {
  /**
   * The current logged in user
   */
  currentUser: CurrentUserQuery_currentUser | null;
}
