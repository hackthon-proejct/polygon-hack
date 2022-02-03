const env = process.env;

const Config = {
  SYNCING_DB: env.SYNCING_DB || false,
  redis: {
    URL: env.REDIS_URL,
    HOST: env.REDIS_HOST || "0.0.0.0",
    PORT: env.REDIS_PORT || 6379,
    PASSWORD: env.REDIS_PASSWORD || "",
  },
  mysql: {
    HOST: env.MYSQL_HOST || "0.0.0.0",
    PASSWORD: env.MYSQL_PASSWORD,
    USER: env.MYSQL_USER,
    DATABASE: env.MYSQL_DATABASE,
  },
  app: {
    PORT: env.PORT || 8080,
    PROTOCOL: env.PROTOCOL || "http",
    HOSTNAME: env.HOSTNAME || "localhost",
    IS_PROD: Boolean(env.IS_PROD) || env.NODE_ENV === "production",
    IS_LOCAL: false, //env.NODE_ENV === "development",
    CLIENT_HOSTNAME: env.CLIENT_HOSTNAME,
  },
  auth: {
    TWITTER: {
      CONSUMER_KEY: env.TWITTER_CONSUMER_KEY,
      CONSUMER_SECRET: env.TWITTER_CONSUMER_SECRET,
      CALLBACK_URL: env.TWITTER_CALLBACK_URL,
    },
    JWT_SECRET: env.JWT_SECRET || "sometestjwtsecret",
    CLIENT_ORIGIN: env.CORS_HOSTNAME,
  },
  log: {
    FILE: env.LOGFILE || "app.log",
    SIZE: Number(env.LOGSIZE || 1024768 * 10),
    NUM_FILES: Number(env.LOG_NUM_FILES || 5),
  },
  aws: {
    ARWEAVE_KEY: env.ARWEAVE_S3_KEY,
    ARWEAVE_SECRET: env.ARWEAVE_S3_SECRET,
    UPLOAD_KEY: env.UPLOAD_S3_KEY,
    UPLOAD_SECRET: env.UPLOAD_S3_SECRET,
    REGION: env.UPLOAD_REGION || "us-west-1",
    UPLOAD_BUCKET: env.UPLOAD_BUCKET || "badger-uploads",
  },
  stripe: {
    SECRET_KEY: env.STRIPE_SECRET_KEY,
  },
  encode: {
    SECRET: env.ENCODE_SECRET,
    IV: env.ENCODE_IV,
  },
};

export default Config;
