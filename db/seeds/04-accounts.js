const bcrypt = require("bcrypt");
const { DateTime } = require("luxon");
const { v4: uuid } = require("uuid");
const tableNames = require("../constants/tableNames");
const logger = require("../utils/logger");

exports.seed = async function (knex) {
  const uniqueId = await knex("users").returning("*");

  await knex(tableNames.accounts).del();

  const accounts = await knex(tableNames.accounts)
    .insert([
      {
        account_owner: uniqueId[0].unique_id,
        current_period_ends: DateTime.local(),
        max_api_checks: 100,
        max_communities: 1,
        max_hashtags: 2,
        stripe_subscription_id: "12jf10hasdf",
        stripe_customer_id: "a3f9h0121l",
        features: ["feature1"],
        plan_id: 1,
      },
      {
        account_owner: uniqueId[1].unique_id,
        current_period_ends: DateTime.local(),
        max_api_checks: 100,
        max_communities: 2,
        max_hashtags: 2,
        stripe_subscription_id: "12jf10hasdf",
        stripe_customer_id: "a3f9h0121l",
        features: ["feature1", "feature2"],
        plan_id: 2,
      },
      {
        account_owner: uniqueId[2].unique_id,
        current_period_ends: DateTime.local(),
        max_api_checks: 100,
        max_communities: 3,
        max_hashtags: 5,
        stripe_subscription_id: "12jf10hasdf",
        stripe_customer_id: "a3f9h0121l",
        features: ["feature1", "feature2", "feature3"],
        plan_id: 3,
      },
    ])
    .returning("*");

  if (process.env.NODE_ENV === "development") {
    logger.info("accounts: ", accounts);
  }
};
