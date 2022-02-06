import { BountyStatus } from "@shared/enums";
import {
  Textarea,
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector, useAppDispatch } from "@redux/hooks";

import { selectUserId } from "@redux/slices/userSlice";

type Props = { bounty: BountyQuery_bounty };

export default function CreatorSubmit({ bounty }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  const isCreator = false;
  // const isCreator = bounty.creator_id === loggedInUserId;
  return (
    <Box>
      <Heading>Submit a revision</Heading>
      <FormLabel>Next Bonus Target:</FormLabel>
      <Text>0.15 ETH (20%)</Text>
      <Text>
        Funders will have 48 hours to vote on whether your revision is worthy of
        a bonus!
      </Text>
      <input type="file" />
      <Textarea placeholder="Summary of submission" />
      <Button>Submit artwork</Button>
    </Box>
  );
}
