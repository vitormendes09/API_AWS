import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config(); // Deve vir antes de acessar process.env

console.log("DB Config:", {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

export const sequelize = new Sequelize(
    process.env.DB_DATABASE as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: Number(process.env.DB_PORT),
        logging: false,
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database conectado com sucesso!');
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Database erro ', error);
        process.exit(1);
    }
};
