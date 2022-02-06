import { gql } from "@apollo/client";
import { BountyData } from "./bounties.graphql";

export const USER = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      id
      profile {
        twitter_handle
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
  }
  ${BountyData}
`;

export const CREATORS = gql`
  query Creators {
    creators {
      id
      profile {
        twitter_handle
        image_url
      }
    }
  }
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
          status
          metadata
          address
          creator_handle
          creator_id
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
      profile {
        twitter_handle
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
  }
  ${BountyData}
`;
