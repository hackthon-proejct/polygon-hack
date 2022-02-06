import { Box } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import bounty from "@utils/bounty";
import BountyJoin from "../BountyJoin";
import Creator from "../UNCLAIMED/CreatorNegotiate";
import FunderJoinOrWithdraw from "./FunderJoinOrWithdraw";

type Props = { bounty: BountyQuery_bounty };
export default function BountyNegotiating({ bounty }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  const isCreator = bounty.creator_id === loggedInUserId;
  return (
    <Box>
      <FunderJoinOrWithdraw bounty={bounty} isCreator={isCreator} />
    </Box>
  );
}
