import { UserId } from '../../domain/value-objects/user-id.vo';
import { UserName } from '../../domain/value-objects/user-name.vo';
import { UserEmail } from '../../domain/value-objects/user-email.vo';
import { UserPassword } from '../../domain/value-objects/user-password.vo';
import { UserRole } from '../../domain/value-objects/user-role.vo';
import { UserRepository } from '../../domain/interfaces/UserRepository.interface';
import {User} from '../../domain/entitites/user.entity';
import { UserCreatedAt } from '../../domain/value-objects/user-created-at.vo';
import { UserUpdatedAt } from '../../domain/value-objects/user-updated-at.vo';
import { EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { Inject } from '@nestjs/common';

export class CreateUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepo: UserRepository, private readonly eventBus: EventBus) { }

    async execute(props: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
    }): Promise<void> {
        const user = User.create(
            UserId.fromString(props.id),
            UserName.fromString(props.firstName + ' ' + props.lastName),
            UserEmail.fromString(props.email),
            UserPassword.fromString(props.password),
            UserRole.fromString(props.role),
            UserCreatedAt.now(),
            UserUpdatedAt.now()
        );
        await this.userRepo.save(user);
        this.eventBus.publish(new UserCreatedEvent(
            user.getId().toString(),
            user.getName().toString(),
            user.getEmail().toString(),
            user.getRole().toString(),
            user.getCreatedAt().toDate(),
            user.getUpdatedAt().toDate(),
        ));
    }
}
