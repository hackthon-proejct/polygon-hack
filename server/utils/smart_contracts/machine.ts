import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0x1252446c00C1bbf348d7e3E8059236b56376De94";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
