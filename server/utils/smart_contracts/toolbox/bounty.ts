import logger from "../../logger";
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
  const maxValue = web3.utils.toWei(web3.utils.toBN(data.maxValue), "gwei");
  const reservePrice = web3.utils.toWei(
    web3.utils.toBN(data.reservePrice),
    "gwei"
  );
  const transaction = MachineContract.methods.create(
    data.creatorWallet,
    maxValue,
    reservePrice,
    data.bonusTargets,
    data.bonusPctYeasNeeded,
    data.bonusFailureThresholds,
    data.mustBeClaimedTime,
    data.timeLimit
  );

  const tx = {
    from: account.address,
    to: transaction._parent._address,
    gas: await transaction.estimateGas({ from: account.address }),
    gasPrice: await web3.eth.getGasPrice(),
    data: transaction.encodeABI(),
  };
  console.log("tx", tx);

  const signed = await web3.eth.accounts.signTransaction(
    tx,
    account.privateKey
  );
  console.log("asdf1", signed);
  const result = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  console.log("asdf2", result);
  const createEvent = MachineContract.options.jsonInterface.filter((token) => {
    return token.type === "event" && token.name == "Create";
  })[0];
  console.log("asdf3", createEvent);

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
export function joinBounty(address: string): string[] {
  // TODO call join bounty
  return [];
}
export function voteOnBounty(address: string): string[] {
  // TODO call vote bounty
  return [];
}
export async function claimBounty(address: string) {
  logger.info("claimBounty: ", { address });
  const Contract = bountyContract(address);
  const transaction = Contract.methods.claim();
  const tx = {
    from: account.address,
    to: transaction._parent._address,
    gas: await transaction.estimateGas({ from: account.address }),
    gasPrice: await web3.eth.getGasPrice(),
    data: transaction.encodeABI(),
  };
  logger.info("claimBounty: ", { tx });

  const signed = await web3.eth.accounts.signTransaction(
    tx,
    account.privateKey
  );
  const result = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  logger.info("claimBounty: ", { result });
  return result.status;
}
