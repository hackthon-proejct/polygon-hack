import { Box } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import bounty from "@utils/bounty";
import BountyJoin from "../BountyJoin";
import Creator from "../UNCLAIMED/CreatorNegotiate";
import BountyPublish from "./BountyPublish";

type Props = { bounty: BountyQuery_bounty };
export default function BountyDraft({ bounty }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  const isInitiator = true;
  // const isCreator = bounty.initator_id === loggedInUserId;
  //
  let shouldShowPublish = isInitiator && !bounty.address;
  // TODO: for testing
  shouldShowPublish = true;
  return <Box>{shouldShowPublish && <BountyPublish id={bounty.id} />}</Box>;
}
