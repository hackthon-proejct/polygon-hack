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
      status
      block_metadata {
        ...BountyDataFrag
      }
      address
      metadata
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
      block_metadata {
        ...BountyDataFrag
      }
      metadata
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
      status
      block_metadata {
        ...BountyDataFrag
      }
      address
      metadata
      initiator_id
      creator_id
    }
  }
  ${BountyData}
`;

export const CREATE_BOUNTY = gql`
  mutation CreateBounty(
    $block_metadata: JSONObject!
    $metadata: JSONObject!
    $board_id: String
    $twitter_handle: String
  ) {
    createBounty(
      block_metadata: $block_metadata
      metadata: $metadata
      board_id: $board_id
      twitter_handle: $twitter_handle
    ) {
      id
      block_metadata {
        ...BountyDataFrag
      }
      metadata
    }
  }
  ${BountyData}
`;

export const PUBLISH_BOUNTY = gql`
  mutation PublishBounty($id: String!) {
    publishBounty(id: $id) {
      id
      block_metadata {
        ...BountyDataFrag
      }
      metadata
    }
  }
  ${BountyData}
`;
