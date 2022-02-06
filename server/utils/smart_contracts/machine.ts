import { web3 } from "./web3";
import configJSON from "../../../web3/build/polygon-contracts/Machine.json";

export const address = "0x2009e043431E5cb79E1561463EcA9788D3672438";

const abi = configJSON.abi;

// @ts-ignore
export default new web3.eth.Contract(abi, address);
