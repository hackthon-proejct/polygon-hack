/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBounty
// ====================================================

export interface CreateBounty_createBounty {
  __typename: "Bounty";
  id: string;
}

export interface CreateBounty {
  createBounty: CreateBounty_createBounty | null;
}

export interface CreateBountyVariables {
  metadata: any;
  board_id?: string | null;
  twitter_handle?: string | null;
}
