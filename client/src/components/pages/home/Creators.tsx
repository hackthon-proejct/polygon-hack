import Head from "next/head";
import { useQuery } from "@apollo/client";
import NextLink from "next/link";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  SimpleGrid,
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
import { BountyStatus } from "@shared/enums";
import { Bounties } from "@gql/__generated__/Bounties";
import { BOUNTIES } from "@gql/bounties.graphql";
import bounty from "@utils/bounty";
import { CreatorPreview } from "./CreatorPreview";

function Creators() {
  // fetch the user info and their bounties from graphql

  const creators = [
    {
      id: "j",
      twitter_handle: "wobsobby",
      profile_pic: "www.google.com",
      bio: "Hello wobsobby is me i go wobby sometimes and then sobby sometimes",
      successes: 2,
      ongoing: 3,
    },
    {
      id: "j",
      twitter_handle: "kumquatexpress",
      profile_pic: "www.google.com",
      bio: "hello my name is kumquat i express go choo choo hello friend goodbye",
      successes: 5,
      ongoing: 1,
    },
  ];
  return (
    <VStack alignItems="flex-start">
      <Heading alignSelf="center">Creators</Heading>
      {creators?.length ? (
        <SimpleGrid sx={styles.bountyWrap} columns={2} spacing="30px">
          {creators.map((creator) =>
            creator ? (
              <Box key={creator.id}>
                <CreatorPreview creator={creator} />
              </Box>
            ) : null
          )}
        </SimpleGrid>
      ) : null}
    </VStack>
  );
}

const styles = {
  bountyWrap: {
    width: "100%",
  },
};

export default Creators;
