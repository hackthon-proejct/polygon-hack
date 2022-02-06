import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/MintSubmission.json";

export const address = "0x0CA98CC8b391C3B32D2EeC7a7ae06929091a1016";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
