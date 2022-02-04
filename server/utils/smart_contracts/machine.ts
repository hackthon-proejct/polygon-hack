import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0xC505A844f84af4a55b1010EC68Bf5A50796f1678";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
