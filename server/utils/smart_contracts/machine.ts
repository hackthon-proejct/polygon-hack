import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0xf6a815a5A6Dcae2110d0f00305747fC5283f9354";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
