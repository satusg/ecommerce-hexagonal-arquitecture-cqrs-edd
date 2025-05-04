import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Application Layer
import { CreateUserHandler } from '../application/commands/handler/create-user.handler';
import { GetUserByIdHandler } from '../application/queries/handlers/get-user-by-id.handler';
// Infrastructure Layer
import { UserController } from '../infrastructure/controllers/user.controller';
import { InMemoryUserRepository } from './repositories/user.in-memory.repository';
import { CreateUserUseCase } from '../application/use-case/create-user.use-case';
import { GetUserByIdUseCase } from '../application/use-case/get-user-by-id.use-case';

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers: [
        CreateUserHandler,
        GetUserByIdHandler,
        {
            provide: 'UserRepository',
            useClass: InMemoryUserRepository,
        },
        {
            provide: 'CreateUserUseCase',
            useClass: CreateUserUseCase
        },
        {
            provide: 'GetUserByIdUseCase',
            useClass: GetUserByIdUseCase
        }
    ],
})
export class UserModule { }
