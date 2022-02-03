import Web3 from "web3";

export const IS_SERVER = typeof window === "undefined";

let eth: any = null;
let web3: any = null;
if (!IS_SERVER) {
  eth = window?.ethereum;
  // @ts-ignore
  eth?.enable();
  // @ts-ignore
  web3 = new Web3(window.web3?.currentProvider);
}
export { eth, web3 };
