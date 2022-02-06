import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0x6b55C1152b3fD0e87dd27E12e1390ae1fC7E3489";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
