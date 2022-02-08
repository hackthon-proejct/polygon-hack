import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/MintSubmission.json";

export const address = "0x13D2265C1A88161e55B239c4079d88a8E9F108ce";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
