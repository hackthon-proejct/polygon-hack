import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0x16fb718F8345beef223EcC4a6e7F40c6c12D43E8";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
