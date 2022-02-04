import { gql } from "@apollo/client";

export const USER = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      id
      board {
        id
        bounties {
          id
          metadata
        }
      }
    }
  }
`;
