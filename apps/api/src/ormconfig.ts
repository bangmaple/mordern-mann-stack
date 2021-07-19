import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const connectionOptions: TypeOrmModuleOptions = {
  type: `postgres`,
  host: '127.0.0.1',
  port: 5432,
  username: `postgres`,
  password: `1234`,
  database: `employee_management`,
  entities: ['**/*.entity{.ts,.js'],
  migrationsTableName: 'migration',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
  ssl: false,
  synchronize: true
}
