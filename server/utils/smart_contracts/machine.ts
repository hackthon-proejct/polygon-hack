import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0xc36DF1d692a03cb9CaD352C5ffa30a5F5cF0612B";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
