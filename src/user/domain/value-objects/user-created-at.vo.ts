import { CreatedAt } from "src/shared/domain/value-objects/created-at.vo";

export class UserCreatedAt {
    private constructor(private readonly value: CreatedAt) {}
    static now(): UserCreatedAt {
        return new UserCreatedAt(CreatedAt.now());
    }
    static from(value: Date): UserCreatedAt {
        return new UserCreatedAt(CreatedAt.from(value))
    }
    toDate(): Date {
        return this.value.toDate();
    }
    toString(): string {
        return this.value.toISOString();
    }
    equals(value: UserCreatedAt): boolean {
        return this.value.equals(value.value);
    }


}