import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user"
import { TaskStatus } from "./entity/taskStatus"
import { Task } from "./entity/task"

export const AppDataSource = new DataSource({
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
