import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";

const baseOptions: ConnectionOptions = {
  type: "postgres",
  port: 5432,
  entities: ["dist/**/**.entity{.ts,.js}"],
  migrations: ["dist/database/migration/*{.js,.ts}"],
  cli: {
    migrationsDir: "src/database/migration",
  },
  migrationsTableName: "migrations",
  logging: true,
  synchronize: false,
};

const dev = {
  username: "postgres",
  password: "root",
  database: "practise",
  host: "localhost",
  ssl: true,
};

export function getOptions() {
  let connectionOptions: ConnectionOptions;

  connectionOptions = baseOptions;

  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    Object.assign(connectionOptions, dev);
  }

  console.log(connectionOptions);

  return connectionOptions;
}
