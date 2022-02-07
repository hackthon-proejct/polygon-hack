import { Box } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import { useQuery } from "@apollo/client";
import { SUBMISSIONS } from "@gql/submissions.graphql";
import {
  SubmissionsForBounty,
  SubmissionsForBountyVariables,
} from "@gql/__generated__/SubmissionsForBounty";
import bountyContract, {
  getVotingStatus,
  stringNumToJS,
  VotingState,
} from "@utils/bounty";
import bounty, { getEquity } from "@utils/bounty";
import { web3 } from "@utils/constants";
import { useEffect, useState } from "react";
import BountyJoin from "../BountyJoin";
import Creator from "../UNCLAIMED/CreatorNegotiate";
import CreatorSubmit from "./CreatorSubmit";
import FunderVote from "./FunderVote";
import Mint from "./Mint";

type Props = { bounty: BountyQuery_bounty; readyToMint?: boolean };
export default function BountyDraft({ bounty, readyToMint }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  const [equity, setEquity] = useState<string>();
  const [votingState, setVotingState] = useState<VotingState | null>(null);
  const { data, loading, error } = useQuery<
    SubmissionsForBounty,
    SubmissionsForBountyVariables
  >(SUBMISSIONS, {
    variables: {
      bounty_id: bounty.id,
    },
  });

  useEffect(() => {
    async function getVoting(contract: any) {
      const status = await getVotingStatus(contract);
      setVotingState(status);
    }
    async function equity(contract: any) {
      const accounts = await web3.eth.getAccounts();
      const equity = await getEquity(contract, accounts[0]);
      setEquity(stringNumToJS(equity));
    }
    if (bounty.address) {
      const contract = bountyContract(bounty.address);
      getVoting(contract);
      equity(contract);
    }
  }, [bounty.address]);

  const filtered =
    data?.submissionsForBounty && votingState
      ? data.submissionsForBounty.filter(
          (s: any) => s?.metadata?.milestone === Number(votingState?.votingOn)
        )
      : [];
  const currSubmission = filtered.length > 0 ? filtered[0] : null;
  const timesAttempedOnCurrentMilestone = filtered.length;

  const isVotingCurrently =
    timesAttempedOnCurrentMilestone !== 0 &&
    timesAttempedOnCurrentMilestone !== Number(votingState?.timesFailed);

  let isCreator = bounty.creator_id === loggedInUserId;
  let shouldShowFunderVote =
    bounty.address != null && equity != null && votingState != null;
  let shouldShowFunderJoin = bounty.address != null && equity == null;

  return readyToMint ? (
    <Mint
      bounty={bounty}
      currSubmission={currSubmission}
      allSubmissions={data?.submissionsForBounty || []}
    />
  ) : (
    <Box>
      {isCreator && votingState && (
        <CreatorSubmit
          isVotingCurrently={isVotingCurrently}
          bounty={bounty}
          votingState={votingState!}
          currSubmission={currSubmission}
          allSubmissions={data?.submissionsForBounty || []}
        />
      )}

      {shouldShowFunderVote ? (
        <FunderVote
          isVotingCurrently={isVotingCurrently}
          equity={Number(equity)}
          bounty={bounty}
          votingState={votingState!}
          currSubmission={currSubmission}
          isCreator={isCreator}
        />
      ) : !isCreator && shouldShowFunderJoin ? (
        <BountyJoin address={bounty.address} />
      ) : null}
    </Box>
  );
}
