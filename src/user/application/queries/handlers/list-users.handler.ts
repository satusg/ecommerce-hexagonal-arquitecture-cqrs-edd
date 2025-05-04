import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import User from 'src/user/domain/entitites/user.entity';
import { ListUsersUseCase } from '../../use-case/list-users.use-case';

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
