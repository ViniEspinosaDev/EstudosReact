
import bcrypt from 'bcrypt';
import type { UserRepository } from '../../infra/repositories/userRepository';
import type { CreateUserDTO } from '../dtos/endpoints/createUserDto';
import { generateToken } from '../../main/utils/jwt';
import { error, success, type ResponseDTO } from '../dtos/responses/responseDto';
import type { UserDto } from '../dtos/userDto';

export class UserService {
    private repo: UserRepository;

    constructor(repo: UserRepository) {
        this.repo = repo;
    }

    async registerUser(data: CreateUserDTO): Promise<ResponseDTO<UserDto>> {
        const userWithEmail = await this.repo.findByEmail(data.email);

        if (userWithEmail)
            return error("Já existe usuário com esse email.");

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.repo.createUser({ ...data, password: hashedPassword });

        if (!user)
            return error("Não foi possível criar usuário.");

        return success(user);
    }

    async login(email: string, password: string) {
        const user = await this.repo.findByEmail(email);

        if (!user) return error("Não possui nenhum usuário com esse email.");

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) return error("Email e/ou senha incorretos.");

        const token = generateToken({ userId: user.id, name: user.name });

        const response = { id: user.id, name: user.name, email: user.email, token: token };

        return success(response);
    }

    async getAllUsers() {
        const users = await this.repo.getAllUsers();
        //return users.map(x => ({ id: x.id, name: x.name, email: x.email }));
        const map = users.map(({ password, ...rest }) => rest);

        return success(map);
    }

    async deleteUser(email: string, password: string) {
        const user = await this.repo.findByEmail(email);

        if (!user) return error("Não possui nenhum usuário com esse email.");

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) return error("Email e/ou senha incorretos.");

        const count = await this.repo.deleteUserById(user.id);

        return count > 0 ? success(count) : error("Não foi possível deletar registro.");
    }
}
