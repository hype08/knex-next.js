const tableNames = require("../constants/tableNames");
const logger = require("../utils/logger");

exports.seed = async function (knex) {
  const users = await knex("users").returning("*");

  const memberships = await knex(tableNames.memberships)
    .insert([
      {
        membership_owner: users[0].unique_id,

        access: "ADMIN",
        receive_weekly_summary: true,
      },
      {
        membership_owner: users[1].unique_id,
        access: "READ_WRITE",
        receive_weekly_summary: true,
      },
      {
        membership_owner: users[2].unique_id,
        access: "READ_ONLY",
        receive_weekly_summary: false,
      },
      {
        membership_owner: users[3].unique_id,
        access: "ADMIN",
        receive_weekly_summary: true,
      },
    ])
    .returning("*");

  if (process.env.NODE_ENV === "development") {
    logger.info("memberships: ", memberships);
  }
};
