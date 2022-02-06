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
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import {
  bountyDeliverableOptions,
  getTimeStringFromSeconds,
} from "@utils/bounty";
import { TimeSecondsType, TimeStringType } from "@utils/types";
import { useState } from "react";

type Props = { bounty: BountyQuery_bounty };

export default function Creator({ bounty }: Props) {
  const currentTimeOnBlockcchain = getTimeStringFromSeconds(
    bounty.block_metadata.timeLimit as TimeSecondsType
  );

  return (
    <Flex direction="column">
      <Heading>Bounty Negotiations</Heading>
      <FormLabel>Deliverable Date</FormLabel>
      <Text>1/21/2022</Text>

      <FormLabel>Demands</FormLabel>
      <Text> List of demands here</Text>

      <HStack>
        <Button>Join Bounty</Button>
        <Button>Withdraw Funds</Button>
      </HStack>
    </Flex>
  );
}

const styles = {
  deliverableCurrent: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "center",
  },
};
