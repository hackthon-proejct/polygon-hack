/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BountiesByUser
// ====================================================

export interface BountiesByUser_bounties_by_user_block_metadata {
  __typename: "BountyData";
  /**
   * The wallet address of the creator, assigned on publish
   */
  creatorWallet: string | null;
  /**
   * The price in ETH at which this bounty is no longer joinable
   */
  maxValue: number;
  /**
   * The price in ETH this bounty must be at to be claimable
   */
  reservePrice: number;
  /**
   * [20,20] if 20% of the funds are disbursed in m0 and m1
   */
  bonusTargets: number[];
  /**
   * [40,40] if 40% if the vote needs to be yea to pass milestones 0 and 1
   */
  bonusPctYeasNeeded: number[];
  /**
   * [1,2] if milestone 0 can fail 1 time and m1 can fail twice
   */
  bonusFailureThresholds: number[];
  /**
   * Datetime when this must be claimed or expires
   */
  mustBeClaimedTime: number;
  /**
   * Time in seconds the creator has to finish this when claimed
   */
  timeLimit: number;
}

export interface BountiesByUser_bounties_by_user {
  __typename: "Bounty";
  id: string;
  /**
   * The blockchain metadata attached to this bounty
   */
  block_metadata: BountiesByUser_bounties_by_user_block_metadata;
  /**
   * The metadata attached to this bounty
   */
  metadata: any;
  /**
   * The funder that initiated this bounty
   */
  initiator_id: string;
  creator_id: string | null;
  /**
   * The twitter handle of the creator
   */
  creator_handle: string;
}

export interface BountiesByUser {
  bounties_by_user: (BountiesByUser_bounties_by_user | null)[] | null;
}

export interface BountiesByUserVariables {
  id: string;
}
