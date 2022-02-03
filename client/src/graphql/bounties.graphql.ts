import { gql } from "@apollo/client";
export const BOUNTIES_BY_USER = gql`
  query BountiesByUser($id: String!) {
    bounties_by_user(id: $id) {
      id
      metadata
    }
  }
`;

export const BOUNTIES = gql`
  query Bounties {
    bounties {
      id
      metadata
    }
  }
`;
