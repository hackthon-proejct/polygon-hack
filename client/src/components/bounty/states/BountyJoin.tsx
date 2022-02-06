import { Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
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

  return (
    <Flex direction="column">
      <Box>
        <FormLabel>Contribution</FormLabel>
        <Input
          type="number"
          value={contribution}
          onChange={(e) => {
            setContribution(e.currentTarget.valueAsNumber);
          }}
          placeholder="0.1ETH"
        />
      </Box>
      <Button
        isDisabled={contribution === 0}
        onClick={() => join(contribution)}
      >
        Join Bounty
      </Button>
    </Flex>
  );
}
