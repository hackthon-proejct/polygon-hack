import { Box } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import bountyContract, { getVotingStatus, VotingState } from "@utils/bounty";
import bounty, { getEquity } from "@utils/bounty";
import { web3 } from "@utils/constants";
import { useEffect, useState } from "react";
import BountyJoin from "../BountyJoin";
import Creator from "../UNCLAIMED/CreatorNegotiate";
import CreatorSubmit from "./CreatorSubmit";
import FunderVote from "./FunderVote";

type Props = { bounty: BountyQuery_bounty };
export default function BountyDraft({ bounty }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  const [equity, setEquity] = useState<string>("0");
  const [votingState, setVotingState] = useState<VotingState | null>(null);

  useEffect(() => {
    async function getVoting(contract: any) {
      const status = await getVotingStatus(contract);
      setVotingState(status);
    }
    async function equity(contract: any) {
      const accounts = await web3.eth.getAccounts();
      const equity = await getEquity(contract, accounts[0]);
      setEquity(equity);
    }
    if (bounty.address) {
      const contract = bountyContract(bounty.address);
      getVoting(contract);
      equity(contract);
    }
  }, []);

  let isCreator = bounty.creator_id === loggedInUserId;
  let shouldShowFunderVote =
    bounty.address != null && equity != null && votingState != null;
  let shouldShowFunderJoin = bounty.address != null && equity == null;
  // TODO: for testing only
  isCreator = false;
  shouldShowFunderVote = true;
  // shouldShowFunderJoin = true;

  return (
    <Box>
      {isCreator ? (
        <CreatorSubmit bounty={bounty} />
      ) : shouldShowFunderVote ? (
        <FunderVote bounty={bounty} votingState={votingState!} />
      ) : shouldShowFunderJoin ? (
        <BountyJoin address={bounty.address} />
      ) : null}
    </Box>
  );
}
