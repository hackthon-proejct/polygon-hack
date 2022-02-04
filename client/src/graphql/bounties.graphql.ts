import { gql } from "@apollo/client";
export const BOUNTIES_BY_USER = gql`
  query BountiesByUser($id: String!) {
    bounties_by_user(id: $id) {
      id
      metadata
      creator_id
    }
  }
`;

export const BOUNTIES = gql`
  query Bounties {
    bounties {
      id
      metadata
      creator_id
    }
  }
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
    }
  }
`;
