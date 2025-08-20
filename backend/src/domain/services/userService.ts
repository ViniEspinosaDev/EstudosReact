
import bcrypt from 'bcrypt';
import type { UserRepository } from '../../infra/repositories/userRepository';
import type { CreateUserDTO } from '../dtos/createUserDto';

export class UserService {
    private repo: UserRepository;

    constructor(repo: UserRepository) {
        this.repo = repo;
    }

    async registerUser(data: CreateUserDTO) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.repo.createUser({ ...data, password: hashedPassword });
    }

    async login(email: string, password: string) {
        const user = await this.repo.findByEmail(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        // Aqui você poderia gerar JWT
        return { id: user.id, name: user.name, email: user.email };
    }
}
