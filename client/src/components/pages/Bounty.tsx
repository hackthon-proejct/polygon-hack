import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { User } from "react-feather";
import { USER } from "@gql/users.graphql";

import {
  UserQuery as UserQueryType,
  UserQueryVariables,
  UserQuery_user,
} from "@gqlt/UserQuery";
import {
  Button,
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  Spacer,
  Wrap,
  WrapItem,
  VStack,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import { BountyPreview } from "@components/bounty/BountyPreview";
import { BOUNTY } from "@gql/bounties.graphql";
import {
  BountyQuery,
  BountyQueryVariables,
} from "@gql/__generated__/BountyQuery";
import { getEmbedUrlFromYoutube } from "@utils/youtube";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import BountyState from "@components/bounty/BountyState";

import bountyContract, {
  BountyBlockState,
  getReadableStatus,
  getEquity,
  getBountyStatus,
  getBalance,
  getUniqueFans,
  stringNumToJS,
} from "@utils/bounty";
import { IS_SERVER, web3 } from "@utils/constants";
import { useWindowResize } from "@utils/hooks";
import YoutubeIframeVideo from "@components/YoutubeIframeVideo";

type Props = { bountyId: string };

function Bounty({ bountyId }: Props) {
  const userId = useAppSelector(selectUserId);
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
  const [bountyState, setBountyState] = useState<BountyBlockState>();
  const [equity, setEquity] = useState<string>("0");
  const [totalFund, setTotalFund] = useState<string>("0");
  const [funders, setFunders] = useState<string>("0");

  useEffect(() => {
    async function getBounty(contract: any) {
      const status = await getBountyStatus(contract);
      setBountyState(status);
    }
    async function totalFund(address: string) {
      const result = await getBalance(address);
      setTotalFund(stringNumToJS(result));
    }
    async function equity(contract: any) {
      const accounts = await web3.eth.getAccounts();
      const equity = await getEquity(contract, accounts[0]);
      setEquity(stringNumToJS(equity));
    }
    async function uniqueFans(contract: any) {
      const funders = await getUniqueFans(contract);
      setFunders(funders);
    }
    if (data?.bounty?.address) {
      const contract = bountyContract(data.bounty.address);
      equity(contract);
      totalFund(data.bounty.address);
      getBounty(contract);
      uniqueFans(contract);
    }
  }, [data]);

  const { bounty } = data || {};
  const { metadata, block_metadata, id, creator_id, address, status } =
    bounty || {};

  const embedURL = getEmbedUrlFromYoutube(metadata?.pitch);

  return bounty != null ? (
    <Box mt={{ base: "52px", md: "80px" }}>
      <VStack>
        <Flex width="100%">
          <Flex direction="column">
            {embedURL != null && !IS_SERVER ? (
              <YoutubeIframeVideo embedURL={embedURL} />
            ) : (
              <Link>{metadata.pitch}</Link>
            )}
            <HStack alignItems="flex-start" my="18px">
              <Flex alignItems="flex-start" direction="column">
                <HStack>
                  <Text variant="metadataLabelLg">Current Funding:</Text>
                  <Text variant="metadataValueLg">
                    {stringNumToJS(bountyState?.totalContribution!)} MATIC (
                    {(
                      Number(stringNumToJS(bountyState?.totalContribution!)) /
                      block_metadata!.maxValue
                    ).toFixed(2)}
                    % of max)
                  </Text>
                </HStack>
                <HStack>
                  <Text variant="metadataLabelLg">Your remaining balance:</Text>
                  <Text variant="metadataValueLg">{totalFund} MATIC</Text>
                </HStack>
              </Flex>
              <Spacer />
              <Flex sx={styles.funderCount}>
                <Text variant="metadataValueLg">{funders}</Text>
                <User />
              </Flex>
            </HStack>
          </Flex>
          <VStack
            direction="column"
            ml="36px"
            alignItems="flex-start"
            spacing="16px"
          >
            <Heading sx={styles.specs}>Specs</Heading>
            <Flex direction="column">
              <Text variant="metadataLabel">Status:</Text>
              <Text variant="metadataValue">
                {getReadableStatus(status, bountyState?.status)}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text variant="metadataLabel">Expiration: </Text>
              <Text variant="metadataValue">
                {block_metadata!.mustBeClaimedTime}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text variant="metadataLabel">Deliverable deadline:</Text>
              <Text variant="metadataValue">{block_metadata!.timeLimit}</Text>
            </Flex>
            <Flex direction="column">
              <Text variant="metadataLabel">Resolution:</Text>

              <Text variant="metadataValue">
                {metadata.specs.resX} x {metadata.specs.resY}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text variant="metadataLabel">Max. Fund Size:</Text>
              <Text variant="metadataValue">
                {block_metadata!.maxValue} MATIC
              </Text>
            </Flex>
            <Flex direction="column">
              <Text variant="metadataLabel">Min. Reserve Price:</Text>
              <Text variant="metadataValue">
                {block_metadata!.reservePrice} MATIC
              </Text>
            </Flex>
            {equity !== "0" ? (
              <Flex direction="column">
                <Text variant="metadataLabel">Your equity:</Text>
                <Text variant="metadataValue">{equity}</Text>
              </Flex>
            ) : null}
          </VStack>
        </Flex>
        <Flex direction="column" alignSelf="flex-start">
          <Heading variant="titleLg">{metadata.title}</Heading>
          <Text variant="descriptionLg">{metadata.description}</Text>
        </Flex>
      </VStack>

      <Divider mt="30px" mb="60px" />
      <BountyState bounty={bounty} blockState={bountyState} />
    </Box>
  ) : (
    <Text>No bounty found.</Text>
  );
}

const styles = {
  bountyWrap: {
    width: "100%",
  },
  specs: {
    fontSize: "32px",
  },
  funderCount: {
    alignItems: "center",
    "& > .chakra-text": {
      marginRight: "4px",
    },
  },
};

export default Bounty;
