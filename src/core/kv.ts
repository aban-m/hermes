import sql from "../database/index.js";

export interface KVEntry {
  key: string;
  value: string;
  timestamp: string;
}

export async function get(key: string): Promise<string | null> {
  const result = await sql.query(`SELECT value FROM kv WHERE key = $1`, [key]);
  return result.rows.length > 0 ? result.rows[0].value : null;
}

export async function set(key: string, value: string): Promise<string> {
  await sql.query(
    `INSERT INTO kv (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2`,
    [key, value]
  );
  return value;
}

export async function del(key: string): Promise<boolean> {
  const result = await sql.query(`DELETE FROM kv WHERE key = $1`, [key]);
  return result.rowCount! > 0;
}

export async function list(): Promise<KVEntry[]> {
  const result = await sql.query<KVEntry>(
    `SELECT key, value, updated_at AS timestamp FROM kv ORDER BY updated_at DESC`
  );
  return result.rows;
}
