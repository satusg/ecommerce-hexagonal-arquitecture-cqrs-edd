// src/user/domain/value-objects/user-name.vo.ts
export const USER_NAME_MIN_LENGTH = 2;
import { InvalidUserNameError } from "../errors/invalid-user-name.error";
export class UserName {
    private constructor(private readonly value: string) {
        if (!UserName.isValid(value)) {
            throw new InvalidUserNameError(value);
        }
    }

    static isValid(value: string): boolean {
        return typeof value === 'string' && value.trim().length >= USER_NAME_MIN_LENGTH;
    }

    static fromString(value: string): UserName {
        return new UserName(value);
    }

    toString(): string {
        return this.value;
    }

    equals(other: UserName): boolean {
        return this.value === other.value;
    }
}
