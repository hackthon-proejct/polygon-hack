import logger from "../../logger";
import { Account } from "web3-core/types";
import { web3, account } from "../web3";
import { BountyData } from "./types";
import MachineContract from "../machine";
import contractJSON from "../../../../web3/build/polygon-contracts/Bounty.json";

const abi = contractJSON.abi;

export default function bountyContract(addr: string) {
  // @ts-ignore
  return new web3.eth.Contract(abi, addr);
}

export async function createBounty(
  data: BountyData
): Promise<{ address: string }> {
  logger.info("createBounty", [data]);
  const transaction = MachineContract.methods.create(...bountyDataToArgs(data));

  const result = await sendTxAndLog(transaction, account);
  logger.info("createBounty: ", { result });

  const createEvent = MachineContract.options.jsonInterface.filter((token) => {
    return token.type === "event" && token.name == "Create";
  })[0];

  let address;
  result.logs.forEach((l) => {
    // @ts-ignore
    if (l.topics[0] === createEvent.signature) {
      try {
        const logRes = web3.eth.abi.decodeLog(
          [
            { type: "string", name: "configAddress", indexed: true },
            { type: "string", name: "sender", indexed: true },
          ],
          l.data,
          l.topics.slice(1)
        );
        address = logRes["configAddress"];
        address = `0x${address.substring(address.length - 40)}`;
        console.log("address", address);
      } catch (e) {
        console.log("no parse", e);
      }
    }
  });
  console.log("bounty created", address);
  return {
    address: address,
  };
}

export async function claimBounty(address: string) {
  logger.info("claimBounty: ", { address });
  const Contract = bountyContract(address);
  const transaction = Contract.methods.claim();

  const result = await sendTxAndLog(transaction, account);
  logger.info("claimBounty: ", { result });
  return result.status;
}

export async function negotiateBounty(address: string, data: BountyData) {
  logger.info("negotiateBounty: ", { address, data });
  const Contract = bountyContract(address);
  const transaction = Contract.methods.negotiate(
    ...bountyDataToArgs(data, "negotiate")
  );

  const result = await sendTxAndLog(transaction, account);
  logger.info("negotiateBounty: ", { result });
  return result.status;
}

export async function negotiateRejoin(address: string, userAddress: string) {
  logger.info("negotiateRejoin: ", { address, userAddress });
  const Contract = bountyContract(address);
  const transaction = Contract.methods.negotiateRejoin(userAddress);

  const result = await sendTxAndLog(transaction, account);
  logger.info("negotiateRejoin: ", { result });
  return result.status;
}

export async function precipitatingEvent(address: string, toggle: boolean) {
  logger.info("precipitatingEvent: ", { address, toggle });
  const Contract = bountyContract(address);
  const transaction = Contract.methods.precipitatingEvent(toggle);

  const result = await sendTxAndLog(transaction, account);
  logger.info("precipitatingEvent: ", { result });
  return result.status;
}

export async function amountRejoinTreasury(
  address: string,
  walletAddr: string
): Promise<string> {
  logger.info("amountRejoinTreasury: ", { address, walletAddr });
  const Contract = bountyContract(address);
  const result = Contract.methods.amountRejoinTreasury(walletAddr).call();
  logger.info("amountRejoinTreasury: ", { result });
  return result.toString();
}

export async function getFansList(address: string): Promise<string[]> {
  logger.info("getFansList: ", { address });
  const Contract = bountyContract(address);
  const results = await Contract.methods.getFansList().call();
  logger.info("getFansList: ", { results });
  return results;
}

export async function getEquityList(address: string): Promise<number[]> {
  logger.info("getEquityList: ", { address });
  const Contract = bountyContract(address);
  const results = await Contract.methods.getEquityList().call();
  logger.info("getEquityList: ", { results });
  return results.map((r) => Number(r));
}

function bountyDataToArgs(
  data: BountyData,
  type: "create" | "negotiate" = "create"
): any[] {
  const maxValue = web3.utils.toWei(
    web3.utils.toBN(data.maxValue * 10 ** 9),
    "gwei"
  );
  const reservePrice = web3.utils.toWei(
    web3.utils.toBN(data.reservePrice * 10 ** 9),
    "gwei"
  );
  return type === "create"
    ? [
        data.creatorWallet,
        maxValue,
        reservePrice,
        data.pctCreatorInitialDisbursement,
        data.pctCreatorFinalDisbursement,
        data.bonusTargets,
        data.bonusPctYeasNeeded,
        data.bonusFailureThresholds,
        data.mustBeClaimedTime,
        data.timeLimit,
      ]
    : [
        maxValue,
        reservePrice,
        data.bonusTargets,
        data.bonusPctYeasNeeded,
        data.bonusFailureThresholds,
        data.timeLimit,
      ];
}

export async function sendTxAndLog(transaction: any, account: Account) {
  const tx = {
    from: account.address,
    to: transaction._parent._address,
    gas: await transaction.estimateGas({ from: account.address }),
    gasPrice: await web3.eth.getGasPrice(),
    data: transaction.encodeABI(),
  };
  logger.info("sending tx: ", { tx });

  const signed = await web3.eth.accounts.signTransaction(
    tx,
    account.privateKey
  );
  const result = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  return result;
}
