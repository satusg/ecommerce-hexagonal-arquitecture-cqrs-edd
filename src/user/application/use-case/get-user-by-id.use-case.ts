import { Inject } from "@nestjs/common";
import {User} from "../../domain/entitites/user.entity";
import { UserNotFoundError } from "../../domain/errors/user-not-found.error";
import { UserRepository } from "../../domain/interfaces/UserRepository.interface";
import { UserId } from "../../domain/value-objects/user-id.vo";

export class GetUserByIdUseCase {
  constructor(@Inject('UserRepository') private readonly repository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const userId = UserId.fromString(id);
    const user = await this.repository.getById(userId);
    if (!user) throw new UserNotFoundError(id);
    return user;
  }
}
