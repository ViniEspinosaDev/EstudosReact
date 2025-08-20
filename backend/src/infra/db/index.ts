import { Kysely, PostgresDialect, type Generated } from 'kysely';
import { Pool } from 'pg';

// Definindo esquema do banco
export interface Database {
    users: {
        id: Generated<number>;
        name: string;
        email: string;
        password: string;
    };
}

// Conexão com Postgres
export const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            user: 'banco',
            host: 'localhost', // se backend estiver em outro container: "pgdb"
            database: 'estudos',
            password: '@Senha123',
            port: 5432,
        })
    })
});
