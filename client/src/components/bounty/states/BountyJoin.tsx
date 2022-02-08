import {
  Text,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { web3 } from "@utils/constants";
import bountyContract, {
  getEquity,
  joinBounty,
  stringNumToJS,
} from "@utils/bounty";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NEGOTIATION } from "@gql/negotiations.graphql";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { NegotiationForBounty } from "@gql/__generated__/NegotiationForBounty";
import { useQuery } from "@apollo/client";

type Props = {
  bounty: BountyQuery_bounty;
  address: string | null;
  hideTitle?: boolean;
};

export default function BountyJoin({
  address,
  bounty,
  hideTitle = false,
}: Props) {
  const router = useRouter();
  const [joining, setJoining] = useState(false);
  const [contribution, setContribution] = useState("");
  const [equity, setEquity] = useState<string>();

  useEffect(() => {
    async function equity(contract: any) {
      const accounts = await web3.eth.getAccounts();
      const equity = await getEquity(contract, accounts[0]);
      setEquity(stringNumToJS(equity));
    }
    if (address) {
      const contract = bountyContract(address);
      equity(contract);
    }
  }, [address]);

  if (address == null) {
    return null;
  }

  const join = async (val: number) => {
    setJoining(true);
    const contract = bountyContract(address);
    const accounts = await web3.eth.getAccounts();
    try {
      const result = await joinBounty(
        contract,
        web3.utils.toWei(val.toString(), "ether"),
        accounts[0]
      );
      router.reload();
      return result;
    } catch (e: any) {
      alert(
        `Something went wrong trying to join this bounty: ${e.message} ; Please try again`
      );
    } finally {
      setJoining(false);
    }
  };

  return (
    <VStack
      direction="column"
      mt="36px"
      spacing="12px"
      maxWidth="80%"
      margin="auto"
    >
      {!hideTitle && (
        <Heading my="12px">
          {equity ? "Add to your contribution" : "Join this bounty"}{" "}
        </Heading>
      )}
      <FormLabel
        htmlFor="bounty-joinContribution"
        fontSize="24px"
        pb="12px"
        textAlign={hideTitle ? "center" : "left"}
      >
        {Number(equity) > 0 ? (
          <>
            You already contributed{" "}
            <Text display="inline-block" fontWeight="700" fontSize="1.2em">
              {equity} MATIC
            </Text>{" "}
            to this bounty - contribute more below!
          </>
        ) : (
          "Interested? Set up a contribution below so you don't miss out on the action."
        )}
      </FormLabel>
      <HStack alignItems="center" pb="12px">
        <Input
          size="lg"
          id="bounty-joinContribution"
          width="300px"
          type="number"
          step="any"
          value={contribution}
          textAlign="right"
          onChange={(e) => {
            setContribution(e.currentTarget.value);
          }}
          placeholder="0.1"
        />
        <Text fontSize="24px">MATIC</Text>
      </HStack>
      <Button
        isLoading={joining}
        isDisabled={contribution === "" || isNaN(Number(contribution))}
        onClick={() => join(Number(contribution))}
      >
        {"Add to Bounty"}
      </Button>
    </VStack>
  );
}
