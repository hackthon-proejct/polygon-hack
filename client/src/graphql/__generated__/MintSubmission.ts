/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MintSubmission
// ====================================================

export interface MintSubmission_mintSubmission_metadata {
  __typename: "SubmissionMetadata";
  image_url: string | null;
  description: string | null;
}

export interface MintSubmission_mintSubmission {
  __typename: "Submission";
  metadata: MintSubmission_mintSubmission_metadata | null;
}

export interface MintSubmission {
  mintSubmission: MintSubmission_mintSubmission | null;
}

export interface MintSubmissionVariables {
  id: string;
}
