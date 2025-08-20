import type { CreateUserDTO } from '../../domain/dtos/createUserDto';
import type { Database } from '../db';
import { Kysely } from 'kysely';

export class UserRepository {
    private db: Kysely<Database>;

    constructor(dbInstance: Kysely<Database>) {
        this.db = dbInstance;
    }

    async createUser(data: CreateUserDTO) {
        const [user] = await this.db
            .insertInto('users')
            .values(data)
            .returning(['id', 'name', 'email'])
            .execute();
        return user;
    }

    async findByEmail(email: string) {
        return this.db
            .selectFrom('users')
            .select(['id', 'name', 'email', 'password'])
            .where('email', '=', email)
            .executeTakeFirst();
    }

    async getAllUsers() {
        return this.db.selectFrom('users').selectAll().execute();
    }
}
