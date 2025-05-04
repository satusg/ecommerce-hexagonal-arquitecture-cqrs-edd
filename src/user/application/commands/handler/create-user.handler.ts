import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { CreateUserUseCase } from '../../use-case/create-user.use-case';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly useCase: CreateUserUseCase,
    ) { }

    async execute(command: CreateUserCommand): Promise<void> {
        const {
            id,
            firstName,
            lastName,
            email,
            password,
            role,
        } = command;

        await this.useCase.execute({
            id,
            firstName,
            lastName,
            email,
            password,
            role,
        });
    }
}
