import { BountyStatus } from "@shared/enums";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  useRadioGroup,
} from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import BountyJoin from "../BountyJoin";
import { useAppSelector, useAppDispatch } from "@redux/hooks";

import { selectUserId } from "@redux/slices/userSlice";
import { RadioCard } from "@components/RadioCard";
import {
  bountyDeliverableOptions,
  getTimeStringFromSeconds,
} from "@utils/bounty";
import { TimeSecondsType, TimeStringType } from "@utils/types";
import { useState } from "react";
import Creator from "./CreatorNegotiate";

type Props = { bounty: BountyQuery_bounty };

export default function BountyUnclaimed({ bounty }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  let isCreator = bounty.creator_id === loggedInUserId;
  isCreator = false;
  return (
    <Box>
      {isCreator ? (
        <Creator bounty={bounty} />
      ) : (
        <BountyJoin address={bounty.address} />
      )}
    </Box>
  );
}
