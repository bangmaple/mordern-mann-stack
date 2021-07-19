import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Injectable} from "@angular/core";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();
@Injectable({
  providedIn: 'root'
})
class ConfigService {
  constructor(private env: {[k: string]: string | undefined}) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Configuration Error - Missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort(): number {
    return parseInt(this.getValue(`PORT`, true), 10);
  }

  public isProduction(): boolean {
    const mode = this.getValue(`MODE`, false);
    return mode != `DEV`;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: `postgres`,
      host: this.getValue(`POSTGRES_HOST`),
      port: parseInt(this.getValue(`POSTGRES_PORT`), 10),
      username: this.getValue(`POSTGRES_USER`),
      password: this.getValue(`POSTGRES_PASSWORD`),
      database: this.getValue(`POSTGRES_DATABASE`),
      entities: ['**/*.entity{.ts,.js'],
      migrationsTableName: 'migration',
      migrations: ['src/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: this.isProduction()
    }
  }
}
const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
  ]);

export {configService};
