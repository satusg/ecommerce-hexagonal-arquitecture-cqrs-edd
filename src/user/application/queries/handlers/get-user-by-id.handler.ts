import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../get-user-by-id.query';
import { Inject } from '@nestjs/common';

import User from 'src/user/domain/entitites/user.entity';
import { UserRepository } from 'src/user/domain/interfaces/UserRepository.interface';
import { UserId } from 'src/user/domain/value-objects/user-id.vo';
import { UserNotFoundError } from 'src/user/domain/errors/user-not-found.error';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) { }

  async execute(query: GetUserByIdQuery): Promise<User> {
    const userId = UserId.fromString(query.id);
    const user = await this.userRepo.getById(userId);
    if (!user) {
      throw new UserNotFoundError(query.id);
    }
    return user;
  }
}
