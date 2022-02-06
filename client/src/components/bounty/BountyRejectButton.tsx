import { Box, Button, Icon, IconButton } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import { Camera } from "react-feather";
import bounty from "@utils/bounty";

type Props = { bounty: BountyQuery_bounty; full?: boolean };
export default function BountyReject({ bounty, full = false }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  let isCreator = bounty.creator_id === loggedInUserId;
  // testing only
  isCreator = true;
  return !isCreator ? null : full ? (
    <Button>Reject Bounty</Button>
  ) : (
    <IconButton
      aria-label="Reject Bounty"
      icon={<Icon as={Camera} />}
    ></IconButton>
  );
}
