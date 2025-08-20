import type { Kysely } from 'kysely'
import type { Database } from '../../db';

export async function up(db: Kysely<Database>) {
	await db.schema
		.createTable('users')
		.ifNotExists()
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('name', 'text', (col) => col.notNull())
		.addColumn('email', 'text', (col) => col.notNull().unique())
		.addColumn('password', 'text', (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<Database>) {
	await db.schema.dropTable('users').execute();
}