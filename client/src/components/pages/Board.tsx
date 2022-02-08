import Head from "next/head";
import Image from "next/image";
import { useQuery } from "@apollo/client";

import {
  Button,
  Heading,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BountyPreview } from "@components/bounty/BountyPreview";
import { LOOKUP_TWITTER_HANDLE } from "@gql/users.graphql";
import {
  LookupTwitterHandle,
  LookupTwitterHandleVariables,
} from "@gql/__generated__/LookupTwitterHandle";
import CreateBounty from "./CreateBounty";
import { BountyStatus } from "@shared/enums";
import { useRouter } from "next/router";

type Props = { twitterHandle: string };

function Board({ twitterHandle }: Props) {
  // fetch the user info and their bounties from graphql

  const router = useRouter();
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
    <VStack>
      <Heading mt="80px" mb="30px" fontSize="50px">
        @{profile.twitter_handle}&apos;s Board
      </Heading>

      <Button
        onClick={() => {
          router.push(`/${profile.twitter_handle}/create`);
        }}
      >
        Create a Bounty
      </Button>

      <Heading pb="20px" alignSelf="flex-start" variant="metadataValueLg">
        Bounties
      </Heading>
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
    </VStack>
  ) : (
    <VStack mt="80px">
      <Heading>
        @{twitterHandle} {"isn't on Bounty yet"}
      </Heading>
      <Text variant="metadataValueLg">
        but you can create one for them when they join!
      </Text>
      <CreateBounty twitterHandle={twitterHandle} />
    </VStack>
  );
}

const styles = {
  bountyWrap: {
    width: "100%",
  },
};

export default Board;
