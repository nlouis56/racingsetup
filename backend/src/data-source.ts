import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users, UserAuth, Posts, Setups, Teams, PublicMessages, PublicMessageReplies, PrivateMessages, SavedVehicles, SetupParameters, SetupValues, Vehicles } from "./entities";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Users,
        UserAuth,
        Posts,
        Setups,
        Teams,
        PrivateMessages,
        PublicMessages,
        PublicMessageReplies,
        SavedVehicles,
        SetupParameters,
        SetupValues,
        Vehicles,
        SavedVehicles
    ],
    migrations: [],
    subscribers: [],
});
