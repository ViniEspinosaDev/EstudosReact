import type { CreateUserDTO } from '../../domain/dtos/endpoints/createUserDto';
import type { UserDto } from '../../domain/dtos/userDto';
import type { Database } from '../db';
import { Kysely } from 'kysely';

export class UserRepository {
    private db: Kysely<Database>;

    constructor(dbInstance: Kysely<Database>) {
        this.db = dbInstance;
    }

    async createUser(data: CreateUserDTO): Promise<UserDto> {
        const [user] = await this.db
            .insertInto('users')
            .values(data)
            .returning(['id', 'name', 'email'])
            .execute();

        return user as UserDto;
    }

    async findByEmail(email: string): Promise<UserDto> {
        const user = await this.db
            .selectFrom('users')
            .select(['id', 'name', 'email', 'password'])
            .where('email', '=', email)
            .executeTakeFirst();

        return user as UserDto;
    }

    async getAllUsers(): Promise<UserDto[]> {
        return this.db.selectFrom('users').selectAll().execute();
    }

    async deleteUserById(id: number): Promise<number> {
        const result = await this.db
            .deleteFrom("users")
            .where("id", "=", id)
            .executeTakeFirst();

        return Number(result?.numDeletedRows) ?? 0;
    }
}
