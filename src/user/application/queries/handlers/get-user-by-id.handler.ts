import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserByIdQuery } from '../get-user-by-id.query';
import { GetUserByIdUseCase } from '../../use-case/get-user-by-id.use-case';
import {User} from 'src/user/domain/entitites/user.entity';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {

  constructor(
    private readonly useCase: GetUserByIdUseCase
  ) {
  }

  async execute(query: GetUserByIdQuery): Promise<User> {
    return this.useCase.execute(query.id);
  }
}
