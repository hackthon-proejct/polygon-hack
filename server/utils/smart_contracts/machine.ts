import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0xa8C3E77ae64B1eCb5Ab5D1F07820882ef06f4c6E";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
