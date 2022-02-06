import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { USER } from "@gql/users.graphql";

import {
  UserQuery as UserQueryType,
  UserQueryVariables,
  UserQuery_user,
} from "@gqlt/UserQuery";
import { Button, Heading, Link, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { BountyPreview } from "@components/bounty/BountyPreview";
import { BOUNTY } from "@gql/bounties.graphql";
import {
  BountyQuery,
  BountyQueryVariables,
} from "@gql/__generated__/BountyQuery";
import { getEmbedUrlFromYoutube } from "@utils/youtube";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import BountyVote from "@components/bounty/BountyVote";
import BountyState from "@components/bounty/BountyState";

import bountyContract, {
  VotingState,
  BountyBlockState,
  getReadableStatus,
  getVotingStatus,
  getEquity,
  getBountyStatus,
} from "@utils/bounty";
import { web3 } from "@utils/constants";

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
  const [votingState, setVotingState] = useState<VotingState | null>(null);
  const [bountyState, setBountyState] = useState<BountyBlockState | null>(null);
  const [equity, setEquity] = useState<string>("0");

  useEffect(() => {
    async function getVoting(contract: any) {
      const status = await getVotingStatus(contract);
      setVotingState(status);
    }
    async function getBounty(contract: any) {
      const status = await getBountyStatus(contract);
      setBountyState(status);
    }
    async function equity(contract: any) {
      const accounts = await web3.eth.getAccounts();
      const equity = await getEquity(contract, accounts[0]);
      setEquity(equity);
    }
    if (data?.bounty?.address) {
      const contract = bountyContract(data.bounty.address);
      getVoting(contract);
      equity(contract);
      getBounty(contract);
    }
  }, [data]);

  const { bounty } = data || {};
  const { metadata, block_metadata, id, creator_id, address, status } =
    bounty || {};

  const embedURL = getEmbedUrlFromYoutube(metadata?.pitch);

  console.log(address, bounty);

  return bounty != null ? (
    <>
      <Heading>{metadata.title}</Heading>
      <Text>Status: {getReadableStatus(status)}</Text>
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
      <Text>max: {block_metadata!.maxValue}</Text>
      <Text>reserve: {block_metadata!.reservePrice}</Text>
      <Text>expiration: {block_metadata!.mustBeClaimedTime}</Text>
      <Text>deadline: {block_metadata!.timeLimit}</Text>
      <Text>your equity: {equity}</Text>
      {bountyState ? (
        <>
          <Text>isPrecipitatingEvent: {bountyState.isPrecipitatingEvent} </Text>
          <Text>totalContribution: {bountyState.totalContribution}</Text>
          <Text>status: {bountyState.status}</Text>
        </>
      ) : null}

      {address &&
      equity &&
      bountyState &&
      bountyState.status === "1" &&
      votingState ? (
        <BountyVote address={address} votingState={votingState} />
      ) : null}
      <BountyState bounty={bounty} />
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
