import Head from "next/head";
import { useQuery } from "@apollo/client";
import NextLink from "next/link";

import {
  Flex,
  Heading,
  Image,
  Link,
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

function Creators() {
  // fetch the user info and their bounties from graphql

  const creators = [
    { id: "j", twitter_handle: "wobsobby", profile_pic: "www.google.com" },
    {
      id: "j",
      twitter_handle: "kumquatexpress",
      profile_pic: "www.google.com",
    },
  ];
  return (
    <VStack alignItems="flex-start">
      <Heading alignSelf="center">Creators</Heading>
      {creators?.length ? (
        <Wrap sx={styles.bountyWrap} spacing="30px">
          {creators.map((creator) =>
            creator ? (
              <WrapItem key={creator.id}>
                <Flex>
                  <Image src={creator.profile_pic} />
                  <NextLink href={`/${creator.twitter_handle}`}>
                    <Link>
                      <Image alt="" src={creator.profile_pic} />
                    </Link>
                  </NextLink>
                  <VStack>
                    <Text>@{creator.twitter_handle}</Text>
                  </VStack>
                </Flex>
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

export default Creators;
