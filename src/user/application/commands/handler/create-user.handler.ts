import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';

import User from 'src/user/domain/entitites/user.entity';
import { UserRepository } from 'src/user/domain/interfaces/UserRepository.interface';

import { UserId } from 'src/user/domain/value-objects/user-id.vo';
import { UserName } from 'src/user/domain/value-objects/user-name.vo';
import { UserEmail } from 'src/user/domain/value-objects/user-email.vo';
import { UserPassword } from 'src/user/domain/value-objects/user-password.vo';
import { UserRole } from 'src/user/domain/value-objects/user-role.vo';

import { Inject } from '@nestjs/common';
import { UserCreatedAt } from 'src/user/domain/value-objects/user-created-at.vo';
import { UserUpdatedAt } from 'src/user/domain/value-objects/user-updated-at.vo';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepo: UserRepository,
    ) { }

    async execute(command: CreateUserCommand): Promise<User> {
        const {
            id,
            firstName,
            lastName,
            email,
            password,
            role,
        } = command;

        const userId = UserId.fromString(id);
        const name = UserName.fromString(firstName + ' ' + lastName);
        const userEmail = UserEmail.fromString(email);
        const userPassword = UserPassword.fromString(password);
        const userRole = UserRole.fromString(role);

        const user = User.create(userId, name, userEmail, userPassword, userRole, UserCreatedAt.now(), UserUpdatedAt.now());


        await this.userRepo.save(user);

        return user;
    }
}
