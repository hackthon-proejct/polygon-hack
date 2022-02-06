import { gql } from "@apollo/client";
import { BountyData } from "./bounties.graphql";

export const NEGOTIATION = gql`
  query NegotiationForBounty($bounty_id: String!) {
    negotiationForBounty(bounty_id: $bounty_id) {
      id
      metadata
      status
      bounty {
        block_metadata {
          ...BountyDataFrag
        }
        address
        metadata
        initiator_id
        creator_id
      }
    }
  }
  ${BountyData}
`;

export const CREATE_NEGOTIATION = gql`
  mutation CreateNegotiation($bounty_id: String!, $metadata: JSONObject!) {
    createNegotiation(bounty_id: $bounty_id, metadata: $metadata) {
      id
      metadata
      status
      bounty {
        block_metadata {
          ...BountyDataFrag
        }
        address
        metadata
        initiator_id
        creator_id
      }
    }
  }
  ${BountyData}
`;

export const REJOIN_BOUNTY = gql`
  mutation RejoinBounty($bounty_id: String!) {
    rejoinBounty(bounty_id: $bounty_id) {
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
