import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Application Layer
import { CreateUserHandler } from '../application/commands/handlers/create-user.handler';
import { GetUserByIdHandler } from '../application/queries/handlers/get-user-by-id.handler';

// Infrastructure Layer
import { UserController } from '../infrastructure/controllers/user.controller';
import { InMemoryUserRepository } from '../infrastructure/repositories/in-memory-user.repository';

// Domain Layer
import { UserRepository } from '../domain/repositories/user.repository';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    CreateUserHandler,
    GetUserByIdHandler,
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class UserModule {}
