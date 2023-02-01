import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user"
import { TaskStatus } from "./entity/taskStatus"
import { Task } from "./entity/task"

let AppDataSource: DataSource;

// migration用にtest環境以外はexportする
if (process.env.NODE_ENV == 'production') {
  AppDataSource = new DataSource({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: "",
    database: "ExpressTest",
    synchronize: false,
    logging: false,
    entities: [User, TaskStatus, Task],
    migrations: ["./migration/*.js"],
    subscribers: [],
  });
} else {
  AppDataSource = new DataSource({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: "",
    database: "ExpressTest",
    synchronize: true,
    logging: false,
    entities: [User, TaskStatus, Task],
    migrations: ["./migration/*.ts"],
    subscribers: [],
  });
}

const testAppDataSource = new DataSource({
  type: "mysql",
  host: "db",
  port: 3306,
  username: "root",
  password: "",
  database: "ExpressTest-test",
  synchronize: true,
  logging: false,
  entities: [User, TaskStatus, Task],
  subscribers: [],
});

const getAppDataSource = ((): DataSource=>{
  switch (process.env.NODE_ENV) {
    case "production":
    case "develop":
      return AppDataSource;
    case "test":
      return testAppDataSource;
    default:
      return testAppDataSource;
  }
});

export {AppDataSource, getAppDataSource};
