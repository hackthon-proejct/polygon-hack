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
import bountyContract, { joinBounty } from "@utils/bounty";
import { useState } from "react";

type Props = { address: string | null };

export default function BountyJoin({ address }: Props) {
  const [contribution, setContribution] = useState(0);

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

  // TODO: add checks for if you're a funder in smart contract
  // const hasJoinedBounty = false;
  // const hasJoinedBounty = userId === bounty?.initiator_id;

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
        Interested? Set up a contribution below so you don't miss out on the
        action!
      </FormLabel>
      <HStack alignItems="center" pb="12px">
        <Input
          size="lg"
          id="bounty-joinContribution"
          width="300px"
          type="number"
          value={contribution || ""}
          textAlign="right"
          onChange={(e) => {
            setContribution(e.currentTarget.valueAsNumber);
          }}
          placeholder="0.1"
        />
        <Text fontSize="24px">MATIC</Text>
      </HStack>
      <Button
        isDisabled={contribution === 0}
        onClick={() => join(contribution)}
      >
        Join Bounty
      </Button>
    </VStack>
  );
}
