import { config } from 'dotenv';
import { join } from 'path';
import { cwd } from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
const isDev = (process.env.APP_MODE ?? 'dev') === 'dev';

/**
 * Entity file: (module).entity.ts
 * Migration file only works with.js file: https://orkhan.gitbook.io/typeorm/docs/migrations#running-and-reverting-migrations
 */
export const typeORMConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_NAME ?? 'gglk',
  synchronize: isDev,
  logging: isDev,
  entities: [join(cwd(), 'dist', '**', `*.entity.js`)],
  migrations: [join(cwd(), 'dist', 'migrations', '*.js')],
};

export const ApplicationDataSource = new DataSource(typeORMConfig);
