const fs = require("fs");

const currDir = process.cwd();
// This file assumes that it will be run automatically with npm install.
// Do *not* run it in any other directory

const env = {
  HOME_DIR: currDir,
  CLIENT_HOSTNAME: "http://localhost:3000",
  CORS_HOSTNAME: "http://localhost:3000",
  JWT_SECRET: "sometestjwtsecret",
  MYSQL_USER: "app_user",
  MYSQL_HOST: "mysql",
  MYSQL_PASSWORD: "hello_world",
  MYSQL_DATABASE: "app_db",
  REDIS_HOST: "redis",
  REDIS_PORT: "6379",
  REDIS_PASSWORD: "",
  REDIS_URL: "",
  UPLOAD_S3_SECRET: "",
  UPLOAD_S3_KEY: "",
  UPLOAD_BUCKET: "",
  UPLOAD_REGION: "",
  ENCODE_SECRET: "SOMERANDOMSECRET",
  ENCODE_IV: "SOMERANDOMIV",
  ETH_GETH_URL: 'https://polygon-mumbai.infura.io/v3/6e8de34c8cc345048eb9ae413c5a3699',
  ETH_KEY: 'REPLACETHIS',
  PINATA_KEY: '104240e89029222db175',
  PINATA_SECRET: 'd0f08882bd4d1f75be3b5bf7dd971906992cc9dd618d9c996b44b3ab8323ab6d',
  TWITTER_CONSUMER_KEY: 'asdf',
  TWITTER_CONSUMER_SECRET: 'asdf',
  TWITTER_CALLBACK_URL: 'http://localhost:8080/auth/twitter/callback'
};

const envFilePath = currDir + "/.env";
try {
  const stats = fs.statSync(envFilePath);
  if (stats && stats.isFile) {
    console.log("Not writing .env because it exists already");
    process.exit(0);
  }
} catch (e) {}

const outputEnvString = Object.keys(env).reduce((memo, key) => {
  return memo + key + "=" + env[key] + "\n";
}, "");

fs.writeFile(envFilePath, outputEnvString, "utf8", (err) => {
  if (err) {
    console.error(
      "[ERROR] There was an error generating your .env file. Please double check your .env file before running docker."
    );
  } else {
    console.log("\x1b[32m", "Successfully generated env file: " + envFilePath);
  }
});
