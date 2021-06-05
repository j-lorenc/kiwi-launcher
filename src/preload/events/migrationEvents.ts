import path from 'path';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const resourceFolder = path.join(__dirname, '../..', '/resources');
const migrationsPath = path.join(resourceFolder, '/migrations');
const dbFileName = path.join(resourceFolder, '/sqlite.db');

export async function applyMigrations(): Promise<void> {
  const db = await open({
    filename: dbFileName,
    driver: sqlite3.Database,
  });

  await db.migrate({
    migrationsPath,
  });
}
