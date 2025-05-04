import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Controllers
import { UserController } from './controllers/user.controller';

// Repositories
import { InMemoryUserRepository } from './repositories/user.in-memory.repository';

// Use Cases
import { CreateUserUseCase } from '../application/use-case/create-user.use-case';
import { GetUserByIdUseCase } from '../application/use-case/get-user-by-id.use-case';
import { ListUsersUseCase } from '../application/use-case/list-users.use-case';

// Handlers
import { CreateUserHandler } from '../application/commands/handler/create-user.handler';
import { GetUserByIdHandler } from '../application/queries/handlers/get-user-by-id.handler';
import { ListUsersHandler } from '../application/queries/handlers/list-users.handler';

// Event Handlers
import { UserCreatedHandler } from '../application/events/handlers/user-created.handler';

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers: [
        CreateUserUseCase,
        GetUserByIdUseCase,
        ListUsersUseCase,

        CreateUserHandler,
        GetUserByIdHandler,
        ListUsersHandler,

        UserCreatedHandler,

        {
            provide: 'UserRepository',
            useClass: InMemoryUserRepository,
        },
    ],
})
export class UserModule { }
