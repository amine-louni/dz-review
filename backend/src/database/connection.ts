import { getConnection } from "typeorm";
/* eslint-disable no-console */
import { createConnection } from "typeorm";

import { config } from "dotenv";
import { __prod__ } from "../constatns";
import { User } from "../entities/User";
import { Business } from "../entities/Business";
import { Domain } from "../entities/Domain";
import { Review } from "../entities/Review";


config();

export const databaseConnection = async (databaseName: string) => {
  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: databaseName,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: !__prod__,

    logger: __prod__ ? undefined : "simple-console",
    entities: [User, Business, Domain, Review],
  });
};

export const databaseClose = async () => {
  const conn = getConnection();
  await conn.close();
};

export const databasePurge = async () => {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
  }
};
