import { gql } from "@apollo/client";

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
          metadata
        }
      }
    }
  }
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
          metadata
        }
      }
    }
  }
`;
