import { gql } from "@apollo/client";
import { BountyData } from "./bounties.graphql";

export const MINT_SUBMISSION = gql`
  mutation MintSubmission($id: String!) {
    mintSubmission(id: $id) {
      id
      metadata {
        image_url
        description
      }
    }
  }
`;

export const CREATE_SUBMISSION = gql`
  mutation CreateSubmission(
    $bounty_id: String!
    $milestone: Int!
    $image: Upload!
    $description: String!
    $mint_metadata: JSONObject!
  ) {
    createSubmission(
      bounty_id: $bounty_id
      image: $image
      milestone: $milestone
      description: $description
      mint_metadata: $mint_metadata
    ) {
      id
      metadata {
        image_url
        description
      }
    }
  }
`;

export const SUBMISSIONS = gql`
  query SubmissionsForBounty($bounty_id: String!) {
    submissionsForBounty(bounty_id: $bounty_id) {
      id
      metadata {
        image_url
        description
        milestone
      }
    }
  }
`;
