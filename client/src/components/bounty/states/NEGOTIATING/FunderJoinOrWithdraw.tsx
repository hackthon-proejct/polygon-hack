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
  canRejoinTreasury,
  negotiateLeave,
} from "@utils/bounty";
import { web3 } from "@utils/constants";
import { TimeSecondsType, TimeStringType } from "@utils/types";
import { useEffect, useState } from "react";

type Props = { bounty: BountyQuery_bounty };

export default function Funder({ bounty }: Props) {
  const { data, loading, error } = useQuery<NegotiationForBounty>(NEGOTIATION, {
    variables: {
      bounty_id: bounty.id,
    },
  });
  const [rejoinBounty, _] = useMutation<RejoinBounty, RejoinBountyVariables>(
    REJOIN_BOUNTY
  );
  const [canRejoin, setCanRejoin] = useState<boolean>(true);

  let negotiation = data?.negotiationForBounty;
  const exitBounty = async () => {
    const accounts = await web3.eth.getAccounts();
    const contract = bountyContract(bounty.address!);
    negotiateLeave(contract, accounts[0]);
  };

  useEffect(() => {
    const canRejoin = async function () {
      const accounts = await web3.eth.getAccounts();
      const contract = bountyContract(bounty.address!);
      const can = await canRejoinTreasury(contract, accounts[0]);
      setCanRejoin(can);
    };
    canRejoin();
  });

  // @ts-ignore
  // negotiation = {
  //   metadata: {
  //     timeLimit: 1000,
  //     description: "joiwjoeijf",
  //     reservePrice: 100,
  //   },
  // };

  let hasNegotiations =
    negotiation?.metadata?.timeLimit != null &&
    negotiation?.metadata?.description != null &&
    negotiation?.metadata?.reservePrice != null;

  // hasNegotiations = true;

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

      {canRejoin ? (
        <HStack>
          <Button
            onClick={() =>
              rejoinBounty({ variables: { bounty_id: bounty.id } })
            }
          >
            Join Bounty
          </Button>
          <Button onClick={exitBounty}>Withdraw Funds</Button>
        </HStack>
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
