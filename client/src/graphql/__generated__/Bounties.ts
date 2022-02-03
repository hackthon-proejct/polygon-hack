/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Bounties
// ====================================================

export interface Bounties_bounties {
  __typename: "Bounty";
  id: string;
  /**
   * The metadata attached to this bounty
   */
  metadata: any | null;
}

export interface Bounties {
  bounties: (Bounties_bounties | null)[] | null;
}
