import { withCookieAuth } from "@utils/auth";
import Layout from "@layouts/Layout";
import { NextPageWithLayout } from "@utils/types";
import bountyContract, {
  getVotingStatus,
  joinBounty,
  voteBounty,
  getEquity,
  getBalance,
} from "@utils/bounty";
import { IS_SERVER, web3 } from "@utils/constants";

const contract =
  !IS_SERVER && bountyContract("0x9f9a5d65af4de28041cde91a4e2f31f1eb509ee0");
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
const vote = async (milestone: number, yeaOrNay: boolean) => {
  const accounts = await web3.eth.getAccounts();
  const result = await voteBounty(contract, milestone, yeaOrNay, accounts[0]);
  console.log("result", result);
  return result;
};
const _getEquity = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await getEquity(contract, accounts[0]);
  return result;
};

const _getBalance = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await getBalance(contract, accounts[0]);
  return result;
};

const DebugPage: NextPageWithLayout = () => {
  //   contract &&
  //     contract.events.Debug(
  //       {
  //         fromBlock: 24591965,
  //         toBlock: "latest",
  //       },
  //       function (err: any, event: any) {
  //         const r = web3.eth.abi.decodeLog(
  //           [{ type: "string", name: "msg", indexed: true }],
  //           event.raw.data,
  //           event.raw.topics[1]
  //         );
  //         console.log("r", r);
  //         console.log("event", event);
  //         console.log("err", err);
  //       }
  //     );
  return (
    <div>
      <main>
        <div>{"hello"}</div>
        <div>
          <button onClick={getStatus}>Status</button>
        </div>
        <div>
          <button onClick={() => join("10000000000000000")}>Join</button>
        </div>
        <div>
          <button onClick={() => vote(0, true)}>Vote Yes</button>
        </div>
        <div>
          <button onClick={() => vote(1, false)}>Vote No</button>
        </div>
        <div>
          <button onClick={_getEquity}>Equity</button>
        </div>
        <div>
          <button onClick={_getBalance}>Balance</button>
        </div>
      </main>
    </div>
  );
};

export default withCookieAuth(DebugPage);
