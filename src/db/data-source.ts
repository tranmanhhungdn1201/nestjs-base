import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 33065,
    username: 'root',
    password: '123',
    database: 'test',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;