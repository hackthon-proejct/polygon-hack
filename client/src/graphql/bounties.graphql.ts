import { gql } from "@apollo/client";
export const BountyData = gql`
  fragment BountyDataFrag on BountyData {
    creatorWallet
    maxValue
    reservePrice
    bonusTargets
    bonusPctYeasNeeded
    bonusFailureThresholds
    mustBeClaimedTime
    timeLimit
  }
`;

export const BOUNTY = gql`
  query BountyQuery($id: String!) {
    bounty(id: $id) {
      id
      metadata {
        ...BountyDataFrag
      }
      initiator_id
      creator_id
    }
  }
  ${BountyData}
`;

export const BOUNTIES_BY_USER = gql`
  query BountiesByUser($id: String!) {
    bounties_by_user(id: $id) {
      id
      metadata {
        ...BountyDataFrag
      }
      initiator_id
      creator_id
    }
  }
  ${BountyData}
`;

export const BOUNTIES = gql`
  query Bounties {
    bounties {
      id
      metadata {
        ...BountyDataFrag
      }
      initiator_id
      creator_id
    }
  }
  ${BountyData}
`;

export const CREATE_BOUNTY = gql`
  mutation CreateBounty(
    $metadata: JSONObject!
    $board_id: String
    $twitter_handle: String
  ) {
    createBounty(
      metadata: $metadata
      board_id: $board_id
      twitter_handle: $twitter_handle
    ) {
      id
      metadata {
        ...BountyDataFrag
      }
    }
  }
  ${BountyData}
`;
