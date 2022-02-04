import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const IS_SERVER = typeof window === "undefined";

let eth: any = null;
let web3: any = null;
if (!IS_SERVER) {
  eth = window?.ethereum;
  // @ts-ignore
  eth?.enable();
  const provider = detectEthereumProvider();
  if (provider) {
    // @ts-ignore
    web3 = new Web3(provider);
  }
}
export { eth, web3 };
