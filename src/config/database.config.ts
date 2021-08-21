import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";


const baseOptions: ConnectionOptions = {
  type: "postgres",
  port: 5432,
  entities: ["dist/**/**.entity.js"]
};


function getOptions() {
  let connectionOptions: ConnectionOptions;

  connectionOptions = baseOptions;

  if (process.env.NODE_ENV == 'production') {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else if( process.env.NODE_ENV == 'development' ) {
    require('dotenv').config({path: '.env/dev.env'})
    
    const dev = {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      migrations: ["dist/database/migration/*.js"],
      cli: {
        migrationsDir: "src/database/migration",
      },
      migrationsTableName: "migrations",
      synchronize: false,
      ssl: { rejectUnauthorized: false },
    };
    
    Object.assign(connectionOptions, dev);
  }else {
    require('dotenv').config({path: '.env/test.env'})
    
    const test = {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      synchronize: true,
    };
    
    Object.assign(connectionOptions, test);
  }

  console.log(connectionOptions);

  return connectionOptions;
}

export = getOptions();
