import { BountyStatus } from "@shared/enums";
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

export async function getEquity(contract: any, account: any): Promise<string> {
  const result = await contract.methods.equityOf(account).call();
  console.log("result", result);
  return result;
}

export async function getBalance(contract: any, account: any): Promise<string> {
  const result = await contract.methods.balanceOf(account).call();
  console.log("result", result);
  return result;
}

export async function joinBounty(contract: any, stake: string, account: any) {
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
  yeaOrNay: boolean,
  account: any
) {
  const result = await contract.methods.vote(milestone, yeaOrNay).send({
    from: account,
  });
  console.log("vote", result);
  return result;
}

const BountyStatusReadableMap: {
  [key in BountyStatus]: string;
} = {
  [BountyStatus.UNKNOWN]: "Unknown",
  [BountyStatus.DRAFT]: "Draft",
  [BountyStatus.UNCLAIMED]: "Unclaimed",
  [BountyStatus.NEGOTIATING]: "Unclaimed",
  [BountyStatus.CLAIMED]: "Claimed",
  [BountyStatus.SUCCEEDED]: "Succeeded",
  [BountyStatus.FAILED]: "Failed",
  [BountyStatus.REJECTED]: "Rejected",
};

export function getReadableStatus(status?: BountyStatus) {
  if (status == null) {
    return BountyStatusReadableMap[BountyStatus.UNKNOWN];
  }
  return BountyStatusReadableMap[status];
}
