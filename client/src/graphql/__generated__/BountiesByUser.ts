/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BountiesByUser
// ====================================================

export interface BountiesByUser_bounties_by_user {
  __typename: "Bounty";
  id: string;
  /**
   * The metadata attached to this bounty
   */
  metadata: any | null;
  /**
   * The funder that initiated this bounty
   */
  initiator_id: string;
  /**
   * The creator who can claim this bounty
   */
  creator_id: string;
}

export interface BountiesByUser {
  bounties_by_user: (BountiesByUser_bounties_by_user | null)[] | null;
}

export interface BountiesByUserVariables {
  id: string;
}
