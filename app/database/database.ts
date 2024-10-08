import { Database } from "./types"; // this is the Database interface we defined earlier
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
const { Pool } = pg;

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/tanstack", // TODO: change to env
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
