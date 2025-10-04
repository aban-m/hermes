import { Client } from "pg";

const sql = new Client({
  connectionString: process.env.DATABASE_URL!,
});

sql.connect();
export default sql;
