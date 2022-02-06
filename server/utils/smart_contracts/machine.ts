import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0xcDeEB4dFc7445d467359b5E40424fe0D54ab96fc";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
