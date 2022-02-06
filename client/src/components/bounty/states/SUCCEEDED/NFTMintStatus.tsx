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
      <Heading>NFT Status: For SALE</Heading>
      <FormLabel>Link to NFT</FormLabel>
      <Text>Image Preview Here</Text>
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
