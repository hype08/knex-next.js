const bcrypt = require("bcrypt");
const { DateTime } = require("luxon");
const { v4: uuid } = require("uuid");
const tableNames = require("../constants/tableNames");
const logger = require("../utils/logger");

exports.seed = async function (knex) {
  await knex(tableNames.users).del();
  const users = await knex(tableNames.users)
    .insert([
      {
        unique_id: uuid(),
        username: "testuser1",
        email: "test@email.us",
        password: bcrypt.hashSync("asdf", 12),
        admin: true,
      },
      {
        unique_id: uuid(),
        username: "testuser2",
        password: bcrypt.hashSync("pass", 12),
        email: "test@email.com",
      },
      {
        unique_id: uuid(),
        username: "testuser3",
        password: bcrypt.hashSync("word", 12),
        email: "test2@email.jp",
      },
      {
        unique_id: uuid(),
        username: "testuser4",
        password: bcrypt.hashSync("jkl;", 12),
        email: "test3@email.kr",
        admin: true,
      },
    ])
    .returning("*");

  if (process.env.NODE_ENV === "development") {
    logger.info("users: ", users);
  }
};
