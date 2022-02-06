/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Creators
// ====================================================

export interface Creators_creators_profile {
  __typename: "Profile";
  twitter_handle: string | null;
  image_url: string | null;
}

export interface Creators_creators {
  __typename: "User";
  /**
   * The uuid of this user
   */
  id: string;
  /**
   * The user's profile
   */
  profile: Creators_creators_profile | null;
}

export interface Creators {
  creators: (Creators_creators | null)[];
}
