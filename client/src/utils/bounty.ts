import { BountyStatus } from "@shared/enums";
import { web3 } from "@utils/constants";
import bountyJSON from "../contracts/polygon-contracts/Bounty.json";

import { TimeSecondsType, TimeStringType } from "@utils/types";
import { swapKeys } from "@utils/helpers";
import BN from "bn.js";

const abi = bountyJSON.abi;

export default function bountyContract(addr: string) {
  // @ts-ignore
  return new web3.eth.Contract(abi, addr);
}

export interface VotingState {
  votingOn: string;
  bonusPct: string;
  bonusValue: string;
  pctYeasNeeded: string;
  yeasNeeded: string;
  currentYeas: string;
  currentNays: string;
  timesFailed: string;
  maxFailures: string;
  currentVotes: string;
}

export interface BountyBlockState {
  totalContribution: string;
  isPrecipitatingEvent: boolean;
  status: string;
}

export async function getVotingStatus(contract: any): Promise<VotingState> {
  const result = await contract.methods.voteStatus().call();
  console.log("getVotingStatus", result);
  const [
    votingOn,
    bonusPct,
    bonusValue,
    pctYeasNeeded,
    yeasNeeded,
    currentYeas,
    currentNays,
    timesFailed,
    maxFailures,
    currentVotes,
  ] = result;
  return {
    votingOn,
    bonusPct,
    bonusValue,
    pctYeasNeeded,
    yeasNeeded,
    currentYeas,
    currentNays,
    timesFailed,
    maxFailures,
    currentVotes,
  };
}

export async function getBountyStatus(
  contract: any
): Promise<BountyBlockState> {
  const result = await contract.methods.bountyStatus().call();
  console.log("getBountyStatus", result);
  const [totalContribution, isPrecipitatingEvent, status] = result;
  return {
    totalContribution,
    isPrecipitatingEvent,
    status,
  };
}

export async function getEquity(contract: any, account: any): Promise<string> {
  const result = await contract.methods.equityOf(account).call();
  console.log("result", result);
  return result;
}

export async function getUniqueFans(contract: any): Promise<string> {
  const result = await contract.methods.uniqueFans().call();
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

export async function negotiateLeave(contract: any, account: any) {
  const result = await contract.methods.negotiateLeave().send({
    from: account,
  });
  console.log("negotiateLeave", result);
  return result;
}

export async function amountRejoinTreasury(
  contract: any,
  account: any
): Promise<string> {
  const result = await contract.methods.amountRejoinTreasury(account).call();
  console.log("amountRejoinTreasury", result);
  return result;
}

export async function voteBounty(
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
  [BountyStatus.NEGOTIATING]: "Negotiating",
  [BountyStatus.CLAIMED]: "Claimed",
  [BountyStatus.SUCCEEDED]: "Succeeded",
  [BountyStatus.FAILED]: "Failed",
  [BountyStatus.REJECTED]: "Rejected",
};

export function getReadableStatus(status?: BountyStatus, blockStatus?: string) {
  if (status == null) {
    return BountyStatusReadableMap[BountyStatus.UNKNOWN];
  }
  if (blockStatus) {
    switch (blockStatus) {
      case "0":
        return "Unclaimed";
      case "1":
        return "Negotiating";
      case "2":
        return "Claimed";
      case "3":
        return "Waiting to Mint";
      case "4":
        return "Success";
      case "5":
        return "Failure";
      default:
        console.log("no status");
    }
  }
  return BountyStatusReadableMap[status];
}

export const bountyExpirationOptions: TimeStringType[] = [
  "48 hours",
  "1 week",
  "2 weeks",
];

export const bountyDeliverableOptions: TimeStringType[] = [
  "48 hours",
  "1 week",
  "2 weeks",
  "1 month",
  "2 months",
  "3 months",
];

const stringToSecondsTimeMap: Record<TimeStringType, TimeSecondsType> = {
  "48 hours": 172800,
  "1 week": 604800,
  "2 weeks": 1209600,
  "1 month": 2629746,
  "2 months": 5259492,
  "3 months": 7889238,
};

const secondsToStringTimeMap = swapKeys(stringToSecondsTimeMap);

export function getSecondsFromTimeString(timeString: TimeStringType) {
  return stringToSecondsTimeMap[timeString];
}

export function getTimeStringFromSeconds(seconds: TimeSecondsType) {
  return secondsToStringTimeMap[seconds];
}

export function stringNumToJS(bn: string): string {
  const num = new BN(bn);
  const converted = num.div(new BN(10 ** 9)).toNumber() / 10 ** 9;
  return converted.toString();
}
