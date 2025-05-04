import { UserId } from '../value-objects/user-id.vo';
import { UserName } from '../value-objects/user-name.vo';
import { UserEmail } from '../value-objects/user-email.vo';
import { UserPassword } from '../value-objects/user-password.vo';
import { UserRole } from '../value-objects/user-role.vo';
import { UserCreatedAt } from '../value-objects/user-created-at.vo';
import { UserUpdatedAt } from '../value-objects/user-updated-at.vo';

export default class User {
  private constructor(
    private readonly id: UserId,
    private readonly name: UserName,
    private readonly email: UserEmail,
    private readonly password: UserPassword,
    private readonly role: UserRole,
    private readonly createdAt: UserCreatedAt,
    private readonly updatedAt: UserUpdatedAt,
  ) {}

  public static create(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    role: UserRole,
    createdAt: UserCreatedAt, 
    updatedAt: UserUpdatedAt
  ): User {
    return new User(id, name, email, password, role, createdAt, updatedAt);
  }

  public getId(): UserId {
    return this.id;
  }

  public getName(): UserName {
    return this.name;
  }

  public getEmail(): UserEmail {
    return this.email;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public getCreatedAt(): UserCreatedAt {
    return this.createdAt;
  }

  public getUpdatedAt(): UserUpdatedAt {
    return this.updatedAt;
  }
  // Any domiuan specific functions can be implemented down here.
}
