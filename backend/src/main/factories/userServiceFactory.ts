import { UserService } from "../../domain/services/userService";
import { db } from "../../infra/db";
import { UserRepository } from "../../infra/repositories/userRepository";

export class UserServiceFactory {
    public static make() {
        const userRepository = new UserRepository(db);
        const userService = new UserService(userRepository);

        return userService;
    }
}