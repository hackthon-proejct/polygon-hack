import axios, { AxiosInstance } from "axios";
import { IS_SERVER } from "./constants";

export function getLocalStorageKey(): string {
  return `${process.env.NEXT_PUBLIC_REACT_APP_JWT_KEY}`;
}

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_REACT_APP_SERV_PROTOCOL}${process.env.NEXT_PUBLIC_REACT_APP_SERV_HOSTNAME}/api`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});
axios.defaults.withCredentials = true;

if (!IS_SERVER) {
  loadJWT();
}

export function loadJWT(override?: string) {
  const jwt = override || localStorage.getItem(getLocalStorageKey());
  if (jwt) {
    // @ts-ignore
    axiosClient.defaults.headers["Authorization"] = `Bearer ${jwt}`;
  }
}

export const APIClient = (): AxiosInstance => {
  return axiosClient;
};
