import { Inject } from "@nestjs/common";
import User from "src/user/domain/entitites/user.entity";
import { UserRepository } from "src/user/domain/interfaces/UserRepository.interface";

export class ListUsersUseCase {
    constructor(@Inject('UserRepository') private readonly repository: UserRepository) { }

    async execute(): Promise<User[]> {
        return await this.repository.getAll();
    }
}
