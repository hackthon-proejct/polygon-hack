/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSubmission
// ====================================================

export interface CreateSubmission_createSubmission_metadata {
  __typename: "SubmissionMetadata";
  image_url: string | null;
  description: string | null;
}

export interface CreateSubmission_createSubmission {
  __typename: "Submission";
  metadata: CreateSubmission_createSubmission_metadata | null;
}

export interface CreateSubmission {
  createSubmission: CreateSubmission_createSubmission | null;
}

export interface CreateSubmissionVariables {
  bounty_id: string;
  milestone: number;
  image: any;
  description: string;
  mint_metadata: any;
}
