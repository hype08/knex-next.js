const path = require("path");
const { loadEnvConfig } = require("@next/env");

const dev = process.env.NODE_ENV !== "production";
const { PG_URI } = loadEnvConfig("./", dev).combinedEnv;
const BASE_PATH = path.join(__dirname, "db");

module.exports = {
  client: "pg",
  connection: PG_URI,
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
