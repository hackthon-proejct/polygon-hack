import Head from "next/head";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { USER } from "@gql/users.graphql";

import {
  UserQuery as UserQueryType,
  UserQueryVariables,
  UserQuery_user,
} from "@gqlt/UserQuery";
import { Heading, Link, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { BountyPreview } from "@components/BountyPreview";
import { BOUNTY } from "@gql/bounties.graphql";
import {
  BountyQuery,
  BountyQueryVariables,
} from "@gql/__generated__/BountyQuery";
import { getEmbedUrlFromYoutube } from "@utils/youtube";

type Props = { bountyId: string };

function Bounty({ bountyId }: Props) {
  // fetch the user info and their bounties from graphql

  const { data, loading, error } = useQuery<BountyQuery, BountyQueryVariables>(
    BOUNTY,
    {
      fetchPolicy: "network-only",
      variables: {
        id: bountyId,
      },
    }
  );

  const { bounty } = data || {};
  const { metadata, id, creator_id } = bounty || {};

  const embedURL = getEmbedUrlFromYoutube(metadata?.pitch);

  return bounty != null ? (
    <>
      <Heading>{metadata.title}</Heading>
      <Text>{metadata.description}</Text>
      {embedURL != null ? (
        <iframe
          width="560"
          height="315"
          src={embedURL}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <Link>{metadata.pitch}</Link>
      )}
      <Text>
        {metadata.specs.resX} x {metadata.specs.resY}
      </Text>
      <Text>max: {metadata.maxValue}</Text>
      <Text>expiration: {metadata.mustBeClaimedTime}</Text>
      <Text>deadline: {metadata.timeLimit}</Text>
    </>
  ) : (
    <Text>No bounty found.</Text>
  );
}

const styles = {
  bountyWrap: {
    width: "100%",
  },
};

export default Bounty;
