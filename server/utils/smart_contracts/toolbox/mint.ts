import logger from "../../logger";
import { Account } from "web3-core/types";
import { web3, account } from "../web3";
import mintContract from "../mint";
import { sendTxAndLog } from "./bounty";

export async function mintSubmission(to: string, url: string) {
  logger.info("mint: ", { to, url });
  const transaction = mintContract.methods.mint(to, url);

  const result = await sendTxAndLog(transaction, account);

  logger.info("mint: ", { result });
  return result.status;
}
