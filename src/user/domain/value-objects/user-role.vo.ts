import { InvalidUserRoleError } from "../errors/invalid-user-role.error";
export type ValidUserRole = 'admin' | 'customer';

export class UserRole {
  private constructor(private readonly value: ValidUserRole) {}

  static validRoles: ValidUserRole[] = ['admin', 'customer'];

  static fromString(role: string): UserRole {
    const normalized = role.trim().toLowerCase();
    if (!UserRole.validRoles.includes(normalized as ValidUserRole)) {
      throw new InvalidUserRoleError(role);
    }
    return new UserRole(normalized as ValidUserRole);
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserRole): boolean {
    return this.value === other.value;
  }

  isAdmin(): boolean {
    return this.value === 'admin';
  }

  isCustomer(): boolean {
    return this.value === 'customer';
  }
}
