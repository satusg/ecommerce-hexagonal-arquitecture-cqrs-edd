import { UserId } from 'src/user/domain/value-objects/user-id.vo';
import { UserName } from 'src/user/domain/value-objects/user-name.vo';
import { UserEmail } from 'src/user/domain/value-objects/user-email.vo';
import { UserPassword } from 'src/user/domain/value-objects/user-password.vo';
import { UserRole } from 'src/user/domain/value-objects/user-role.vo';
import { UserRepository } from 'src/user/domain/interfaces/UserRepository.interface';
import User from 'src/user/domain/entitites/user.entity';
import { UserCreatedAt } from 'src/user/domain/value-objects/user-created-at.vo';
import { UserUpdatedAt } from 'src/user/domain/value-objects/user-updated-at.vo';

export class CreateUserUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(props: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
    }): Promise<User> {
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
        return user;
    }
}
