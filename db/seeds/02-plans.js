const tableNames = require("../constants/tableNames");
const logger = require("../utils/logger");

exports.seed = async function (knex) {
  await knex(tableNames.plans).del();
  const plans = await knex(tableNames.plans)
    .insert([
      {
        name: "Basic",
        max_api_checks: 100,
        max_communities: 1,
        max_hashtags: 1,
        max_users: 1,
        features: ["feature1"],
      },
      {
        name: "Pro",
        max_api_checks: 100,
        max_communities: 2,
        max_hashtags: 2,
        max_users: 2,
        features: ["feature1", "feature2"],
      },
      {
        name: "Premium",
        max_api_checks: 100,
        max_communities: 3,
        max_hashtags: 3,
        max_users: 5,
        features: ["feature1", "feature2", "feature3"],
      },
    ])
    .returning("*");

  if (process.env.NODE_ENV === "development") {
    logger.info("plans: ", plans);
  }
};
