// src/user/domain/value-objects/user-email.vo.ts
import { InvalidUserEmailError } from "../errors/invalid-user-email.error";
export class UserEmail {
    private constructor(private readonly value: string) {
        if (!UserEmail.isValid(value)) {
            throw new InvalidUserEmailError(value);
        }
    }

    static isValid(value: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof value === 'string' && emailRegex.test(value.trim());
    }

    static fromString(value: string): UserEmail {
        return new UserEmail(value.trim());
    }

    toString(): string {
        return this.value;
    }

    equals(other: UserEmail): boolean {
        return this.value === other.value;
    }
}
