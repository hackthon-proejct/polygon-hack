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
import { CREATORS, LOOKUP_TWITTER_HANDLE } from "@gql/users.graphql";
import {
  LookupTwitterHandle,
  LookupTwitterHandleVariables,
} from "@gql/__generated__/LookupTwitterHandle";
import { BountyStatus } from "@shared/enums";
import { Bounties } from "@gql/__generated__/Bounties";
import { BOUNTIES } from "@gql/bounties.graphql";
import bounty from "@utils/bounty";
import { CreatorPreview } from "./CreatorPreview";
import { Creators as CreatorsQuery } from "@gql/__generated__/Creators";

function Creators() {
  // fetch the user info and their bounties from graphql
  const { data, loading, error } = useQuery<CreatorsQuery>(CREATORS);
  const creators = data?.creators;
  return (
    <VStack alignItems="flex-start">
      <Heading mb="14px">Creators</Heading>
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
