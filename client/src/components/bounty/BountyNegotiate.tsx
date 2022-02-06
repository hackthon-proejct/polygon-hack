import { BountyStatus } from "@shared/enums";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector, useAppDispatch } from "@redux/hooks";

import { selectUserId } from "@redux/slices/userSlice";

type Props = { bounty: BountyQuery_bounty };

export default function BountyNegotiate({ bounty }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  const isCreator = true;
  // const isCreator = bounty.creator_id === loggedInUserId;
  return (
    <Box>
      <Text>NEGOTIATE SECTION vvvv</Text>
      {isCreator ? (
        <Flex direction="column">
          <Text>
            input UI for creator submitting a negotiation/change of demands
          </Text>
          <Button>Submit</Button>
        </Flex>
      ) : (
        <Text>
          Put in voting logic and UI here for now. Need to add in checks for for
          the change of demands that was submitted
        </Text>
      )}
    </Box>
  );
}
