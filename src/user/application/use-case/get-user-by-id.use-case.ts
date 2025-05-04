import User from "src/user/domain/entitites/user.entity";
import { UserNotFoundError } from "src/user/domain/errors/user-not-found.error";
import { UserRepository } from "src/user/domain/interfaces/UserRepository.interface";
import { UserId } from "src/user/domain/value-objects/user-id.vo";

export class GetUserByIdUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const userId = UserId.fromString(id);
    const user = await this.repository.getById(userId);
    if (!user) throw new UserNotFoundError(id);
    return user;
  }
}
