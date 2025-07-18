import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as process from 'node:process';
import { join } from 'path';
import { cwd } from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

function AssembleDataSourceOption(
  context: NodeJS.ProcessEnv | ConfigService,
): DataSourceOptions {
  /**
   * Entity file: (module).entity.ts
   * Migration file only works with.js file: https://orkhan.gitbook.io/typeorm/docs/migrations#running-and-reverting-migrations
   */
  const parseEnv =
    context instanceof ConfigService
      ? (key: string, defaultValue: string = '') =>
          context.get<string>(key) ?? defaultValue
      : (key: string, defaultValue: string = '') =>
          key in process.env ? context[key] : defaultValue;

  return {
    type: 'postgres',
    host: parseEnv('DB_HOST', 'localhost'),
    port: Number(parseEnv('DB_PORT', '5432')),
    username: parseEnv('DB_USER', 'postgres'),
    password: parseEnv('DB_PASSWORD', 'password'),
    database: parseEnv('DB_NAME', 'gglk'),
    synchronize: false,
    entities: [join(cwd(), 'dist', '**', `*.entity.js`)],
    migrations: [join(cwd(), 'dist', '**/migrations', '*.js')],
  };
}

@Injectable()
export class DataSourceConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): DataSourceOptions {
    return AssembleDataSourceOption(this.configService);
  }
}

// TypeORM CLI readable datasource
config({});

export const ApplicationDataSource = new DataSource(
  AssembleDataSourceOption(process.env),
);
