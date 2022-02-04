import { withCookieAuth } from "@utils/auth";
import Layout from "@layouts/Layout";
import { NextPageWithLayout } from "@utils/types";
import bountyContract, {
  getVotingStatus,
  joinBounty,
  vote,
} from "@utils/bounty";
import { web3 } from "@utils/constants";

const contract = bountyContract("0x3f8f8fc7482f21022fae303bf18a9f00f82110e3");
const getStatus = async () => {
  const result = await getVotingStatus(contract);
  console.log("result", result);
  return result;
};
const join = async (val: string) => {
  const accounts = await web3.eth.getAccounts();
  const result = await joinBounty(contract, val, accounts[0]);
  console.log("result", result);
  return result;
};
const voteBounty = async (milestone: number, yeaOrNay: boolean) => {
  const accounts = await web3.eth.getAccounts();
  const result = await vote(contract, milestone, yeaOrNay, accounts[0]);
  console.log("result", result);
  return result;
};

const DebugPage: NextPageWithLayout = () => {
  return (
    <div>
      <main>
        <div>{"hello"}</div>
        <button onClick={getStatus}>Status</button>
        <button onClick={() => join("10000000")}>Join</button>
        <button onClick={() => voteBounty(0, true)}>Vote</button>
      </main>
    </div>
  );
};

export default withCookieAuth(DebugPage);
