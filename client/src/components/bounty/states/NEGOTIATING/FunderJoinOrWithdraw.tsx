import { useMutation, useQuery } from "@apollo/client";
import {
  Text,
  Flex,
  Heading,
  FormLabel,
  HStack,
  VStack,
  Textarea,
  Input,
  Button,
  useRadioGroup,
} from "@chakra-ui/react";
import { RadioCard } from "@components/RadioCard";
import { NEGOTIATION, REJOIN_BOUNTY } from "@gql/negotiations.graphql";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { NegotiationForBounty } from "@gql/__generated__/NegotiationForBounty";
import {
  RejoinBounty,
  RejoinBountyVariables,
} from "@gql/__generated__/RejoinBounty";
import bountyContract, {
  amountRejoinTreasury,
  negotiateLeave,
  stringNumToJS,
} from "@utils/bounty";
import { web3 } from "@utils/constants";
import { TimeSecondsType, TimeStringType } from "@utils/types";
import { useEffect, useState } from "react";
import BountyJoin from "../BountyJoin";

type Props = { bounty: BountyQuery_bounty; isCreator: boolean };

export default function Funder({ bounty, isCreator }: Props) {
  const { data, loading, error } = useQuery<NegotiationForBounty>(NEGOTIATION, {
    variables: {
      bounty_id: bounty.id,
    },
  });
  const [rejoinBounty, _] = useMutation<RejoinBounty, RejoinBountyVariables>(
    REJOIN_BOUNTY
  );
  const [canRejoin, setCanRejoin] = useState<string>("0");

  let negotiation = data?.negotiationForBounty;
  const exitBounty = async () => {
    const accounts = await web3.eth.getAccounts();
    const contract = bountyContract(bounty.address!);
    await negotiateLeave(contract, accounts[0]);
  };

  useEffect(() => {
    const canRejoin = async function () {
      const accounts = await web3.eth.getAccounts();
      const contract = bountyContract(bounty.address!);
      const can = await amountRejoinTreasury(contract, accounts[0]);
      setCanRejoin(stringNumToJS(can));
    };
    canRejoin();
  });

  let hasNegotiations =
    negotiation?.metadata?.timeLimit != null &&
    negotiation?.metadata?.description != null &&
    negotiation?.metadata?.reservePrice != null;

  return negotiation ? (
    <VStack
      direction="column"
      mt="36px"
      spacing="12px"
      maxWidth="80%"
      margin="auto"
    >
      <Heading my="12px">Creator Negotiation</Heading>
      <Text
        textAlign="center"
        htmlFor="bounty-joinContribution"
        fontSize="24px"
        pb="12px"
      >
        @{bounty.creator_handle} is interested in your bounty!{" "}
        {hasNegotiations
          ? "Before they can get started, they have a few requests."
          : null}
      </Text>

      <VStack
        direction="column"
        pb="36px"
        alignItems="flex-start"
        maxWidth="80%"
        display="block"
      >
        {negotiation.metadata.timeLimit != null ? (
          <>
            <Text variant="metadataLabelLg">Deliverable Date</Text>
            <Text variant="metadataValueLg">
              {negotiation.metadata.timeLimit}
            </Text>
          </>
        ) : null}

        {negotiation.metadata.description != null ? (
          <>
            <Text variant="metadataLabelLg">Demands</Text>
            <Text variant="metadataValueLg">
              {negotiation.metadata.description}
            </Text>
          </>
        ) : null}

        {negotiation.metadata.reservePrice != null ? (
          <>
            <Text variant="metadataLabelLg">Minimum Reserve Price</Text>
            <Text variant="metadataValueLg">
              {negotiation.metadata.reservePrice}
            </Text>
          </>
        ) : null}
      </VStack>

      {canRejoin !== "0" ? (
        <>
          <Text>You have {canRejoin} MATIC staked</Text>
          <HStack>
            <Button
              onClick={() =>
                rejoinBounty({ variables: { bounty_id: bounty.id } })
              }
            >
              Rejoin Bounty
            </Button>
            <Button onClick={exitBounty}>Withdraw Funds</Button>
          </HStack>
        </>
      ) : !isCreator ? (
        <BountyJoin address={bounty.address} />
      ) : null}
    </VStack>
  ) : null;
}

const styles = {
  deliverableCurrent: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "center",
  },
};
