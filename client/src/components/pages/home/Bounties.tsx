import Head from "next/head";
import Image from "next/image";
import { useQuery } from "@apollo/client";

import { Heading, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { BountyPreview } from "@components/bounty/BountyPreview";
import { LOOKUP_TWITTER_HANDLE } from "@gql/users.graphql";
import {
  LookupTwitterHandle,
  LookupTwitterHandleVariables,
} from "@gql/__generated__/LookupTwitterHandle";
import { BountyStatus } from "@shared/enums";
import { Bounties } from "@gql/__generated__/Bounties";
import { BOUNTIES } from "@gql/bounties.graphql";

function Bounties() {
  // fetch the user info and their bounties from graphql

  const { data, loading, error } = useQuery<Bounties>(BOUNTIES, {
    fetchPolicy: "network-only",
  });

  const { bounties = [] } = data || {};
  return (
    <VStack alignItems="flex-start">
      <Heading alignSelf="center">Bounties</Heading>
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
      ) : null}
    </VStack>
  );
}

const styles = {
  bountyWrap: {
    width: "100%",
  },
};

export default Bounties;
