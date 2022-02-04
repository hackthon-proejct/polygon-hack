/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BountyQuery
// ====================================================

export interface BountyQuery_bounty {
  __typename: "Bounty";
  id: string;
  /**
   * The metadata attached to this bounty
   */
  metadata: any | null;
  /**
   * The creator who can claim this bounty
   */
  creator_id: string;
}

export interface BountyQuery {
  bounty: BountyQuery_bounty | null;
}

export interface BountyQueryVariables {
  id: string;
}
