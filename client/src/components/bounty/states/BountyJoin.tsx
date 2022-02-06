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

type Props = { address: string | null };

export default function BountyJoin({ address }: Props) {
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
  }, []);

  if (address == null) {
    return null;
  }

  const join = async (val: number) => {
    const contract = bountyContract(address);
    const accounts = await web3.eth.getAccounts();
    const result = await joinBounty(
      contract,
      web3.utils.toWei(val.toString(), "ether"),
      accounts[0]
    );
    return result;
  };

  return (
    <VStack
      direction="column"
      mt="36px"
      spacing="12px"
      maxWidth="80%"
      margin="auto"
    >
      <Heading my="12px">Join this bounty</Heading>
      <FormLabel htmlFor="bounty-joinContribution" fontSize="24px" pb="12px">
        {equity
          ? `You have ${equity} MATIC in this bounty - contribute more below!`
          : "Interested? Set up a contribution below so you don't miss out on the action!"}
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
        isDisabled={contribution === "" || isNaN(Number(contribution))}
        onClick={() => join(Number(contribution))}
      >
        Join Bounty
      </Button>
    </VStack>
  );
}
