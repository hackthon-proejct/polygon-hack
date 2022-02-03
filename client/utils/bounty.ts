import { web3 } from "@utils/constants";
import bountyJSON from "../contracts/polygon-contracts/Bounty.json";

const abi = bountyJSON.abi;

export default function bountyContract(addr: string) {
  // @ts-ignore
  return new web3.eth.Contract(abi, addr);
}

export async function getVotingStatus(contract: any) {
  const result = await contract.methods.voteStatus().call();
  console.log("getVotingStatus", result);
  const [
    votingOn,
    pctYeasNeeded,
    currentYeas,
    currentNays,
    timesFailed,
    maxFailures,
    currentVotes,
  ] = result;
  return {
    votingOn: votingOn,
    pctYeasNeeded: pctYeasNeeded,
    currentYeas: currentYeas,
    currentNays: currentNays,
    timesFailed: timesFailed,
    maxFailures: maxFailures,
    currentVotes: currentVotes,
  };
}

export async function joinBounty(contract: any, stake: number, account: any) {
  const result = await contract.methods.join().send({
    from: account,
    value: web3.utils.toBN(stake),
  });
  console.log("joinBounty", result);
  return result;
}

export async function vote(
  contract: any,
  milestone: number,
  vote: boolean,
  account: any
) {
  const result = await contract.methods.vote(milestone, vote).send({
    from: account,
  });
  console.log("vote", result);
  return result;
}
