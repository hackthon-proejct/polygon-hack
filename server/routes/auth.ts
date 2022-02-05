"use strict";
import Router, { RouterContext } from "koa-router";
import { Next } from "koa";

import passport from "../utils/passport";
import { setJwtHeaderOnLogin } from "../utils/jwt";
import User from "../models/User.model";
import { web3 } from "../utils/smart_contracts/web3";
import Web3PublicKey from "../models/Web3PublicKey.model";
import logger from "../utils/logger";
import Profile from "../models/Profile.model";

const authRouter = new Router({
  prefix: "/auth",
});
const ENCRYPTED_MSG = `Open sesame!`;

/* AUTH */
const _authFunc = (strat: string) => {
  return async (ctx: RouterContext, next: Next) => {
    return passport.authenticate(strat, (err: Error, user: User) => {
      if (!user) {
        ctx.body = err;
        ctx.throw(401);
      } else {
        ctx.status = 200;
        setJwtHeaderOnLogin(ctx, user);
        return;
      }
    })(ctx, next);
  };
};

authRouter.get("/current_user", async (ctx, next) => {
  return passport.authenticate("jwt", (err: Error, user: User) => {
    ctx.body = {
      user: user,
      token: ctx.request.headers["authorization"],
    };
    ctx.status = 200;
    next();
  })(ctx, next);
});
authRouter.post("/create", async (ctx, next) => {
  // password is a Buffer, key is a base58 encoded string
  const { password, key } = ctx.request.body;
  const decryptedKey = await web3.eth.accounts.recover(ENCRYPTED_MSG, password);
  if (decryptedKey.toLowerCase() === key.toLowerCase()) {
    try {
      return await Web3PublicKey.findByPk(key).then(async (account) => {
        let existing;
        if (account) {
          existing = await User.findByPk(account.user_id, {
            include: Profile,
          });
        } else {
          // Create account object
          existing = await User.create();
          await Web3PublicKey.create({
            key: key,
            user_id: existing.id,
          });
        }
        return _authFunc("local")(ctx, next);
      });
    } catch (err) {
      logger.error("/create", [err]);
    }
  } else {
    ctx.throw(401);
  }
});
authRouter.post("/twitter/merge", async (ctx, next) => {
  const { handle } = ctx.request.body;
  let maybeProfile = await Profile.findOne({
    where: {
      twitter_handle: handle,
    },
  });
  if (!maybeProfile) {
    const user = await User.findByPk(ctx.state.user.id, {
      include: Profile,
    });
    if (user.profile) {
      maybeProfile = user.profile;
      maybeProfile.twitter_handle = handle;
      await maybeProfile.save();
    } else {
      maybeProfile = await Profile.create({
        user_id: ctx.state.user.id,
        twitter_handle: handle,
      });
    }
  } else if (!maybeProfile.user_id) {
    maybeProfile.user_id = ctx.state.user.id;
    await maybeProfile.save();
  }
  ctx.status = 200;
});

export default authRouter;
