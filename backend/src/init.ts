import { db } from './infra/db';

export async function initDB() {
    await db.schema
        .createTable('users')
        .ifNotExists()
        .addColumn('id', 'serial', col => col.primaryKey().autoIncrement())
        .addColumn('name', 'text', col => col.notNull())
        .addColumn('email', 'text', col => col.notNull().unique())
        .addColumn('password', 'text', col => col.notNull())
        .execute();
}

initDB().then(() => console.log('Banco inicializado'))
    .catch(console.error);
