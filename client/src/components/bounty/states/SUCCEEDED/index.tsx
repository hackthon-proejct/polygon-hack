import { Box } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import bounty from "@utils/bounty";
import BountyJoin from "../BountyJoin";
import Creator from "../UNCLAIMED/CreatorNegotiate";
import NFTMintStatus from "./NFTMintStatus";

type Props = { bounty: BountyQuery_bounty };
export default function BountySucceeded({ bounty }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  const isCreator = false;
  // const isCreator = bounty.creator_id === loggedInUserId;
  return (
    <Box>
      <NFTMintStatus bounty={bounty} />
    </Box>
  );
}
