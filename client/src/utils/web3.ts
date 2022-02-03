import detectEthereumProvider from "@metamask/detect-provider";

export async function isMetaMaskInstalled() {
  const provider = await detectEthereumProvider();
  return Boolean(provider);
}
