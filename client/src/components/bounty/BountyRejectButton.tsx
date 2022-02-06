import { Box, Button, Icon, IconButton } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import { X } from "react-feather";
import bounty from "@utils/bounty";
import { CSSObject } from "@emotion/react";

type Props = { bounty: BountyQuery_bounty; full?: boolean; sx?: CSSObject };
export default function BountyReject({
  sx,
  bounty,
  full = false,
  ...props
}: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  let isCreator = bounty.creator_id === loggedInUserId;
  // testing only
  isCreator = true;
  return !isCreator ? null : full ? (
    <Button sx={sx} {...props}>
      Reject Bounty
    </Button>
  ) : (
    <IconButton
      sx={sx}
      variant="reject"
      aria-label="Reject Bounty"
      icon={<X size={20} {...props} />}
    ></IconButton>
  );
}
