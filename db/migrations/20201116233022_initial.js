const { addDefaultColumns, createNameTable } = require("../utils/tableUtils");
const tableNames = require("../constants/tableNames");

exports.up = async function (knex) {
  await Promise.all([
    // users
    knex.schema.createTable(tableNames.users, (t) => {
      t.increments().primary().unsigned().notNullable();
      t.string("unique_id")
        .unique()
        .notNullable()
        .comment("unique id for system");
      t.string("username").unique().notNullable();
      t.string("first_name");
      t.string("last_name");
      t.string("email").unique().notNullable();
      t.string("password").unique().notNullable();
      t.boolean("admin").notNullable().defaultTo(false);
      t.dateTime("last_login");
      addDefaultColumns(t);
    }),

    // plans
    knex.schema.createTable(tableNames.plans, (t) => {
      t.increments().primary().unsigned().notNullable();
      t.string("name");
      t.integer("max_api_checks").comment("max api calls for this plan");
      t.integer("max_communities").comment(
        "max ig profiles this plan can manage"
      );
      t.integer("max_hashtags").comment("max ig hashtags manageable");
      t.integer("max_ig_accounts").comment("max ig accounts manageable");
      t.integer("max_users").comment("max users on this plan");
      t.specificType("features", "text ARRAY");
      addDefaultColumns(t);
    }),

    // memberships
    knex.schema.createTable(tableNames.memberships, (t) => {
      t.increments().primary().unsigned().notNullable();
      t.string("membership_owner")
        .unsigned()
        .references("users.unique_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .comment("references user from register");
      t.enu("access", ["READ_ONLY", "READ_WRITE", "ADMIN", "OWNER"]).comment(
        "access of this user"
      );
      t.boolean("receive_weekly_summary");
      addDefaultColumns(t);
    }),

    knex.schema.createTable(tableNames.accounts, (t) => {
      t.increments().primary().unsigned().notNullable();
      t.string("account_owner").references("users.unique_id");
      t.string("stripe_subscription_id");
      t.string("stripe_customer_id");
      t.dateTime("current_period_ends").comment("billing period ends");
      t.integer("plan_id")
        .unsigned()
        .references("plans.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      t.integer("max_api_checks").comment(
        "custom override plan max api checks"
      );
      t.integer("max_communities").comment("custom override plan ig profiles");
      t.integer("max_hashtags").comment("custom override plan ig hashtags");
      t.specificType("features", "text ARRAY").comment(
        "custom override plan features"
      );
      t.integer("max_ig_accounts").comment(
        "custom override max no. of accounts this account can manage"
      );
      addDefaultColumns(t);
    }),

    // engagement
    knex.schema.createTable(tableNames.ig_accounts, (t) => {
      t.increments().primary().unsigned().notNullable();
      t.string("unique_id").notNullable();
      t.boolean("powered").defaultTo(false);
      t.string("username").unique().notNullable();
      t.string("email").notNullable();
      t.string("password", 127).notNullable();
      t.specificType("community", "text ARRAY");
      t.specificType("hashtag", "text ARRAY");
      t.specificType("location", "text ARRAY");
      t.integer("accounts_id")
        .unsigned()
        .references("accounts.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      addDefaultColumns(t);
    }),

    // scraping
    knex.schema.createTable(tableNames.ig_communities, (t) => {
      t.boolean("powered").defaultTo(false);
      t.string("unique_id").primary().notNullable();
      t.string("username").notNullable();
      t.integer("instagram_id").notNullable();
      t.boolean("is_private");
      t.string("full_name");
      t.integer("edge_followed_by_count");
      t.integer("edge_owner_to_timeline_media");
      t.integer("edge_follow_count");
      t.string("biography");
      t.string("external_url");
      t.string("business_email");
      t.boolean("is_business_account");
      t.string("business_category_name");
      t.string("category_enum");
      t.boolean("is_verified");
      t.string("profile_pic_url");
      t.boolean("is_joined_recently");
      t.unique("instagram_id");
      addDefaultColumns(t);
    }),

    // scraping
    knex.schema.createTable(tableNames.ig_hashtags, (t) => {
      t.string("hashtag");
      t.string("total_posts");
      t.boolean("powered").defaultTo(false);
      addDefaultColumns(t);
    }),

    createNameTable(knex, tableNames.countries),
  ]);
};

exports.down = async function (knex) {
  await Promise.all(
    [
      tableNames.ig_accounts,
      tableNames.ig_communities,
      tableNames.ig_hashtags,
      tableNames.countries,
      tableNames.memberships,
      tableNames.accounts,
      tableNames.plans,
      tableNames.users,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};
