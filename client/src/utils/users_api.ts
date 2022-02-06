import { getLocalStorageKey, APIClient, loadJWT } from "./api_client";

export async function getOrCreateUser(key: string, signature: Buffer) {
  console.log("getting or creating");
  const resp = await APIClient().post("/auth/create", {
    key: key,
    password: signature,
  });
  console.log("hello", resp);
  localStorage.setItem(getLocalStorageKey(), resp.data.access_token);
  loadJWT();
}

export async function mergeUser(
  handle: string,
  image_url: string,
  token: string
) {
  const client = APIClient();
  loadJWT(token);
  const resp = await client.post("/auth/twitter/merge", {
    handle: handle,
    image_url: image_url,
  });
  return resp.data?.user;
}

export async function currentUser() {
  const resp = await APIClient().get("/auth/current_user");
  return resp.data?.user;
}
