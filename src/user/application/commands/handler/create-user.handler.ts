import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';

import { UserRepository } from 'src/user/domain/interfaces/UserRepository.interface';

import { Inject } from '@nestjs/common';
import { CreateUserUseCase } from '../../use-case/create-user.use-case';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    private useCase: CreateUserUseCase
    constructor(
        @Inject('UserRepository')
        private readonly userRepo: UserRepository,
    ) {
        this.useCase = new CreateUserUseCase(userRepo);
    }

    async execute(command: CreateUserCommand): Promise<void> {
        const {
            id,
            firstName,
            lastName,
            email,
            password,
            role,
        } = command;

        this.useCase.execute(
            {
                id,
                firstName,
                lastName,
                email,
                password,
                role
            }
        )
    }
}
