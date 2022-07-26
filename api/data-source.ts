import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user"
import { WorkStatus } from "./entity/workStatus"
import { Work } from "./entity/work"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: "",
    database: "ExpressTest",
    synchronize: true,
    logging: false,
    entities: [User, WorkStatus, Work],
    migrations: ["./migration/*.ts"],
    subscribers: [],
});
