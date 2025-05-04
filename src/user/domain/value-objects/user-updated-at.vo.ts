import { UpdatedAt } from "src/shared/domain/value-objects/updated-at.vo";

export class UserUpdatedAt {
    private constructor(private readonly value: UpdatedAt) { }
    static now(): UserUpdatedAt {
        return new UserUpdatedAt(UpdatedAt.now());
    }
    static from(value: Date): UserUpdatedAt {
        return new UserUpdatedAt(UpdatedAt.from(value))
    }
    toDate(): Date {
        return this.value.toDate();
    }
    toString(): string {
        return this.value.toISOString();
    }
    equals(value: UserUpdatedAt): boolean {
        return this.value.equals(value.value);
    }
}