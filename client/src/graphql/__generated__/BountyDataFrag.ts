/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BountyDataFrag
// ====================================================

export interface BountyDataFrag {
  __typename: "BountyData";
  /**
   * The wallet address of the creator, assigned on publish
   */
  creatorWallet: string | null;
  /**
   * 1000000000 = 1 gwei, the price at which this bounty is no longer joinable
   */
  maxValue: string;
  /**
   * 1000000000 = 1 gwei, the price this bounty must be at to be claimable
   */
  reservePrice: string;
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
