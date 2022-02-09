import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0x69300A0EB7A84df237E47423056B703D49aFAcD5";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
