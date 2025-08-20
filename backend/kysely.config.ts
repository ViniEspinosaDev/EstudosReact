import { defineConfig } from "kysely-ctl";
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export default defineConfig({
    dialect: new PostgresDialect({
        pool: new Pool({
            user: 'banco',
            host: 'localhost', // se backend estiver em outro container: "pgdb"
            database: 'estudos',
            password: '@Senha123',
            port: 5432,
        })
    }),
    migrations: {
        migrationFolder: './src/infra/db/migrations',
    },
});
