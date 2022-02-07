/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Bounties
// ====================================================

export interface Bounties_bounties_block_metadata {
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

export interface Bounties_bounties {
  __typename: "Bounty";
  id: string;
  status: number;
  /**
   * The blockchain metadata attached to this bounty
   */
  block_metadata: Bounties_bounties_block_metadata;
  /**
   * The contract address for this bounty
   */
  address: string | null;
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

export interface Bounties {
  bounties: (Bounties_bounties | null)[] | null;
}
