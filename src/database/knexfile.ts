import { Knex } from "knex";
import Config from "../Config";

let { config } = Config();

let knexConfig: Knex.Config = {
    client: "mysql",
    connection: {
        database: config.database.dbname,
        host: config.database.host,
        user: config.database.username,
        password: config.database.password
    }
}

export = knexConfig;