import { BountyStatus } from "@shared/enums";
import { Box, Text } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector, useAppDispatch } from "@redux/hooks";

import { selectUserId } from "@redux/slices/userSlice";

type Props = { bounty: BountyQuery_bounty };

export default function BountySubmit({ bounty }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  const isCreator = false;
  // const isCreator = bounty.creator_id === loggedInUserId;
  return (
    <Box>
      <Text>SUBMIT SECTION vvvvv</Text>
      {isCreator ? (
        <Text>UI for creator submitting a submission</Text>
      ) : (
        <Text>
          Put in voting logic and UI here for now. Need to add in checks for the
          current submission
        </Text>
      )}
    </Box>
  );
}
