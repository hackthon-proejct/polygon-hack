import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/MintSubmission.json";

export const address = "0x5eA7aB178544C09Aa801CB3111780D5A9ddEf9E7";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
