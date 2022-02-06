import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0x2882d3BD131158812C489fe4581401E7B089A32B";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
