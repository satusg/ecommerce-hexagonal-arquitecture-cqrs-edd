import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {User} from 'src/user/domain/entitites/user.entity';
import { ListUsersUseCase } from '../../use-case/list-users.use-case';
import { ListUsersQuery } from '../list-users.query';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {

  constructor(
    private readonly useCase: ListUsersUseCase
  ) {
  }

  async execute(query: ListUsersQuery): Promise<User[]> {
    return await this.useCase.execute();
  }
}
