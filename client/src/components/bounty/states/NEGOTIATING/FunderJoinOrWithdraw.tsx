import { useMutation, useQuery } from "@apollo/client";
import {
  Text,
  Flex,
  Heading,
  FormLabel,
  HStack,
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
  const [canRejoin, setCanRejoin] = useState<boolean>(false);

  const negotiation = data?.negotiationForBounty;
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

  return negotiation ? (
    <Flex direction="column">
      <Heading>Bounty Negotiations</Heading>
      <FormLabel>Deliverable Date</FormLabel>
      <Text>{negotiation.metadata.timeLimit}</Text>

      <FormLabel>Demands</FormLabel>
      <Text>{negotiation.metadata.description}</Text>

      <FormLabel>Minimum Bounty</FormLabel>
      <Text>{negotiation.metadata.reservePrice}</Text>

      <FormLabel>Can Rejoin or Withdraw</FormLabel>
      <Text>{canRejoin.toString()}</Text>

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
    </Flex>
  ) : null;
}

const styles = {
  deliverableCurrent: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "center",
  },
};
