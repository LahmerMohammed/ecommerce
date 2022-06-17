import "reflect-metadata";
import { DataSourceOptions, createConnection } from "typeorm";


const baseOptions:  DataSourceOptions = {
  type: "postgres",
  port: 5432,
  entities: ["dist/**/**.entity.js"],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
  migrations: ["dist/database/migration/*.js"],
  migrationsTableName: "migrations",
};


function getOptions() {
  let connectionOptions: DataSourceOptions;

  connectionOptions = baseOptions;

  if (process.env.DATABASE_URL) {
    Object.assign(
      connectionOptions,
      {
        url: process.env.DATABASE_URL
      });
  } else {
    require('dotenv').config({path: '.env/dev.env'})
    
    const dev = {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
    };
    
    Object.assign(connectionOptions, dev);
  }

  console.log(connectionOptions);

  return connectionOptions;
}

export = getOptions();
