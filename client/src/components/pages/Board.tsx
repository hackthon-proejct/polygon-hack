import Head from "next/head";
import Image from "next/image";
import { useQuery } from "@apollo/client";

import { Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { BountyPreview } from "@components/bounty/BountyPreview";
import { LOOKUP_TWITTER_HANDLE } from "@gql/users.graphql";
import {
  LookupTwitterHandle,
  LookupTwitterHandleVariables,
} from "@gql/__generated__/LookupTwitterHandle";
import CreateBounty from "./CreateBounty";
import { BountyStatus } from "@shared/enums";

type Props = { twitterHandle: string };

function Board({ twitterHandle }: Props) {
  // fetch the user info and their bounties from graphql

  const { data, loading, error } = useQuery<
    LookupTwitterHandle,
    LookupTwitterHandleVariables
  >(LOOKUP_TWITTER_HANDLE, {
    fetchPolicy: "network-only",
    variables: {
      handle: twitterHandle,
    },
  });

  const profile = data?.lookupTwitterHandle || null;

  const { board } = profile || {};
  const { bounties = [] } = board || {};
  return profile != null ? (
    <>
      <Heading>@{profile.twitter_handle}&apos;s Board</Heading>
      <Text>Bounties</Text>
      {bounties?.length ? (
        <Wrap sx={styles.bountyWrap} spacing="30px">
          {bounties.map((bounty) =>
            bounty ? (
              <WrapItem key={bounty.id}>
                <BountyPreview bounty={bounty} />
              </WrapItem>
            ) : null
          )}
        </Wrap>
      ) : (
        <>
          <Text>No bounties found</Text>
        </>
      )}
      <CreateBounty twitterHandle={twitterHandle} />
    </>
  ) : (
    <>
      <Heading>
        @{twitterHandle} {"isn't on Bounty yet"}
      </Heading>
      <Text>but you can create one for them when they join!</Text>
      <CreateBounty twitterHandle={twitterHandle} />
    </>
  );
}

const styles = {
  bountyWrap: {
    width: "100%",
  },
};

export default Board;
