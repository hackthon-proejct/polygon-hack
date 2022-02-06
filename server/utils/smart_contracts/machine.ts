import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0xd172DE2EBCEDF725f2DB9530bd685Ae85C2cBda3";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
