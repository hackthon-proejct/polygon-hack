import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/MintSubmission.json";

export const address = "0xF873e465626CB069C846899Abc89398621251AA8";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
