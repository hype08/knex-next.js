import { getKnex } from "../../db";

export default async function handler(req, res) {
  const knex = getKnex();
  const users = await knex("users");
  res.status(200).json(users);
}
