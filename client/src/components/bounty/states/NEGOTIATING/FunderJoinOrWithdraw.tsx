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
  getEquity,
  negotiateLeave,
  stringNumToJS,
} from "@utils/bounty";
import { web3 } from "@utils/constants";
import { TimeSecondsType, TimeStringType } from "@utils/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BountyJoin from "../BountyJoin";

type Props = { bounty: BountyQuery_bounty; isCreator: boolean };

export default function Funder({ bounty, isCreator }: Props) {
  const router = useRouter();
  const { data, loading, error } = useQuery<NegotiationForBounty>(NEGOTIATION, {
    variables: {
      bounty_id: bounty.id,
    },
  });
  const [rejoinBounty, { loading: rejoinLoading }] = useMutation<
    RejoinBounty,
    RejoinBountyVariables
  >(REJOIN_BOUNTY);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [canRejoin, setCanRejoin] = useState<string>("0");
  console.log("iscr", isCreator);

  let negotiation = data?.negotiationForBounty;
  const exitBounty = async () => {
    setWithdrawLoading(true);
    const accounts = await web3.eth.getAccounts();
    const contract = bountyContract(bounty.address!);
    await negotiateLeave(contract, accounts[0]);
    setWithdrawLoading(false);
    router.reload();
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
  const [equity, setEquity] = useState<string>();

  useEffect(() => {
    async function equity(contract: any) {
      const accounts = await web3.eth.getAccounts();
      const equity = await getEquity(contract, accounts[0]);
      setEquity(stringNumToJS(equity));
    }
    if (bounty.address) {
      const contract = bountyContract(bounty.address);
      equity(contract);
    }
  }, [bounty.address]);

  console.log("rejoining", canRejoin);

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
      <Heading my="12px">
        {isCreator
          ? hasNegotiations
            ? "Terms of Service (pending)"
            : "Submit Terms of Service"
          : "Creator Terms of Service"}
      </Heading>

      {!isCreator ? (
        hasNegotiations ? (
          Number(equity) === 0 ? (
            <>
              <Text
                textAlign="center"
                htmlFor="bounty-joinContribution"
                fontSize="24px"
              >
                @{bounty.creator_handle} submitted their Terms of Service! You
                have one more chance to leave the bounty.
              </Text>
              <Text
                textAlign="center"
                htmlFor="bounty-joinContribution"
                fontSize="24px"
                mt="0px !important"
                pb="12px"
              >
                {hasNegotiations
                  ? "Before they can get started, they have a few requests."
                  : null}
              </Text>
            </>
          ) : null
        ) : (
          <>
            <Text
              textAlign="center"
              htmlFor="bounty-joinContribution"
              fontSize="24px"
            >
              @{bounty.creator_handle} is interested in this bounty!
            </Text>
          </>
        )
      ) : (
        <>
          <Text
            textAlign="center"
            htmlFor="bounty-joinContribution"
            fontSize="24px"
          >
            You&apos;ve already expressed interest in this bounty!
          </Text>
          <Text
            textAlign="center"
            htmlFor="bounty-joinContribution"
            fontSize="24px"
            mt="0px !important"
            pb="12px"
          >
            Waiting on funders to join or withdraw
          </Text>
        </>
      )}
      {canRejoin !== "0" && !isCreator && (
        <>
          <Text>You have {canRejoin} MATIC staked</Text>
          <HStack>
            <Button
              isLoading={rejoinLoading}
              disabled={rejoinLoading}
              onClick={() => {
                rejoinBounty({ variables: { bounty_id: bounty.id } });
                router.reload();
              }}
            >
              Rejoin Bounty
            </Button>
            <Button
              isLoading={withdrawLoading}
              disabled={withdrawLoading}
              onClick={exitBounty}
            >
              Withdraw Funds
            </Button>
          </HStack>
        </>
      )}

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
      {
        // only show it at the end if you're not committed
        !isCreator && (
          <BountyJoin hideTitle={Number(equity) > 0} address={bounty.address} />
        )
      }
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
