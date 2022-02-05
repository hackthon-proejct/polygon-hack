import passport from "passport";
import cookieSession from "cookie-session";
import url from "url";
import redirect from "micro-redirect";
import { Strategy as PassportTwitter } from "passport-twitter";

export function getPassport() {
  return passport;
}

passport.use(
  "twitter",
  new PassportTwitter(
    {
      consumerKey: process.env.NEXT_TWITTER_CONSUMER_KEY!,
      consumerSecret: process.env.NEXT_TWITTER_CONSUMER_SECRET!,
      callbackURL: process.env.NEXT_TWITTER_CALLBACK_URL!,
    },
    (token: any, tokenSecret: any, profile: any, cb: any) => {
      cb(null, profile.username);
    }
  )
);

export default function withPassport(fn: any) {
  return (req: any, res: any) => {
    if (!res.redirect) {
      // passport.js needs res.redirect:
      // https://github.com/jaredhanson/passport/blob/1c8ede/lib/middleware/authenticate.js#L261
      // Monkey-patch res.redirect to emulate express.js's res.redirect,
      // since it doesn't exist in micro. default redirect status is 302
      // as it is in express. https://expressjs.com/en/api.html#res.redirect
      res.redirect = (location: string) => redirect(res, 302, location);
    }

    // Initialize Passport and restore authentication state, if any, from the
    // session. This nesting of middleware handlers basically does what app.use(passport.initialize())
    // does in express.
    cookieSession({
      name: "passportSession",
      signed: false,
      // @ts-ignore
      domain: url.parse(req.url).host,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })(req, res, () =>
      passport.initialize()(req, res, () => {
        passport.session()(req, res, () => {
          // call wrapped api route as innermost handler
          return fn(req, res);
        });
      })
    );
  };
}
