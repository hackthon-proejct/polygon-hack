import { NextApiResponse, NextApiRequest } from "next";
import withPassport, { getPassport } from "@utils/with_passport";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200);
  getPassport().authenticate("twitter")(req, res);
};

export default withPassport(handler);
