import { mergeUser } from "@utils/users_api";
import cookie from "cookie";
import withPassport, { getPassport } from "@utils/with_passport";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<{}>) => {
  const cookies = req.headers.cookie;

  let auth_token = "";
  if (typeof cookies === "string") {
    const cookiesJSON = cookie.parse(cookies);
    auth_token = cookiesJSON.auth_token;
    res.status(200);
  } else {
    res.status(404);
    return;
  }
  getPassport().authenticate("twitter", async (err: Error, handle: string) => {
    await mergeUser(handle, auth_token);
    res.redirect("http://localhost:3000");
  })(req, res);
};

export default withPassport(handler);
