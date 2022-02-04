import { Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

type Props = {};

export default function BountyJoin() {
  const [contribution, setContribution] = useState(0);
  //
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
          placeholder="Min: 0.5ETH"
        />
      </Box>
      <Button isDisabled={contribution === 0}> Join Bounty</Button>
    </Flex>
  );
}
