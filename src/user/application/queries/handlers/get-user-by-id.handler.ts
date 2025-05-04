import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { GetUserByIdQuery } from '../get-user-by-id.query';
import { GetUserByIdUseCase } from '../../use-case/get-user-by-id.use-case';
import { UserRepository } from 'src/user/domain/interfaces/UserRepository.interface';
import User from 'src/user/domain/entitites/user.entity';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  private readonly useCase: GetUserByIdUseCase;

  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {
    this.useCase = new GetUserByIdUseCase(this.repository);
  }

  async execute(query: GetUserByIdQuery): Promise<User> {
    return this.useCase.execute(query.id);
  }
}
