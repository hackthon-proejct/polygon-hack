import { gql } from "@apollo/client";
import { BountyData } from "./bounties.graphql";

export const USER = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      id
      board {
        id
        bounties {
          initiator_id
          creator_id
          id
          block_metadata {
            ...BountyDataFrag
          }
          metadata
          address
        }
      }
    }
  }
  ${BountyData}
`;

export const LOOKUP_TWITTER_HANDLE = gql`
  query LookupTwitterHandle($handle: String!) {
    lookupTwitterHandle(handle: $handle) {
      board {
        id
        bounties {
          initiator_id
          creator_id
          id
          block_metadata {
            ...BountyDataFrag
          }
          metadata
          address
        }
      }
      user_id
      twitter_handle
      image_url
    }
  }
  ${BountyData}
`;

export const CURRENT_USER = gql`
  query CurrentUserQuery {
    currentUser {
      id
      board {
        id
        bounties {
          initiator_id
          creator_id
          id
          block_metadata {
            ...BountyDataFrag
          }
          metadata
        }
      }
    }
  }
  ${BountyData}
`;
