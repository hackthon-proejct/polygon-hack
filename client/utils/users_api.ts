import { getLocalStorageKey, APIClient, loadJWT } from "./api_client";

export async function loginUser(email: string, password: string) {
  const resp = await APIClient().post("/auth/create", { email, password });
  localStorage.setItem(getLocalStorageKey(), resp.data.access_token);
  loadJWT();
}

export async function getOrCreateUser(key: string, signature: Buffer) {
  const resp = await APIClient().post("/auth/create", {
    key: key,
    password: signature,
  });
  localStorage.setItem(getLocalStorageKey(), resp.data.access_token);
  loadJWT();
}

export async function currentUser() {
  const resp = await APIClient().get("/auth/current_user");
  return resp.data?.user;
}
