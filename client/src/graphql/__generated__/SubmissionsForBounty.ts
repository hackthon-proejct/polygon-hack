/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubmissionsForBounty
// ====================================================

export interface SubmissionsForBounty_submissionsForBounty_metadata {
  __typename: "SubmissionMetadata";
  image_url: string | null;
  description: string | null;
  milestone: number | null;
}

export interface SubmissionsForBounty_submissionsForBounty {
  __typename: "Submission";
  metadata: SubmissionsForBounty_submissionsForBounty_metadata | null;
}

export interface SubmissionsForBounty {
  submissionsForBounty: (SubmissionsForBounty_submissionsForBounty | null)[] | null;
}

export interface SubmissionsForBountyVariables {
  bounty_id: string;
}
