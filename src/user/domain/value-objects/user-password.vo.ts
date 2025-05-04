import { InvalidUserPasswordError } from "../errors/invalid-user-password.error"; 

export class UserPassword {
  private constructor(private readonly value: string) {
    if (!UserPassword.isValid(value)) {
      throw new InvalidUserPasswordError();
    }
  }

  static isValid(value: string): boolean {
    return typeof value === 'string' && value.trim().length >= 8;
  }

  static fromString(value: string): UserPassword {
    return new UserPassword(value.trim());
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserPassword): boolean {
    return this.value === other.value;
  }
}
