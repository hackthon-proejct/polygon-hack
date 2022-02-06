import { gql } from "@apollo/client";
import { BountyData } from "./bounties.graphql";

export const CREATE_SUBMISSION = gql`
  mutation CreateSubmission(
    $bounty_id: String!
    $milestone: Int!
    $image: Upload!
    $description: String!
  ) {
    createSubmission(
      bounty_id: $bounty_id
      image: $image
      milestone: $milestone
      description: $description
    ) {
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
      metadata {
        image_url
        description
        milestone
      }
    }
  }
`;
