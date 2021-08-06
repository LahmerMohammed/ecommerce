import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";

const baseOptions: ConnectionOptions = {
  type: "postgres",
  port: 5432,
  entities: ["dist/**/**.entity.js"],
  migrations: ["dist/database/migration/*.js"],
  cli: {
    migrationsDir: "src/database/migration",
  },
  migrationsTableName: "migrations",
  logging: true,
  synchronize: false,
  ssl: { rejectUnauthorized: false },
};

const dev = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
};

function getOptions() {
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

export = getOptions();
