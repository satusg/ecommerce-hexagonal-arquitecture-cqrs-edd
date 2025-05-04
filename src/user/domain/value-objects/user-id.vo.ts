import UUID from "src/shared/domain/value-objects/uuid.vo";

export class UserId {
    private constructor(private readonly value: UUID) { }
    generate(): UserId {
        return new UserId(UUID.generate());
    }
    static fromString(value: string): UserId {
        return new this(UUID.fromString(value));
    }
    static isValid(value: string) {
        return UUID.isValid(value);
    }
    toString(): string {
        return this.value.toString();
    }
    equals(other: UserId): boolean {
        return other.value.equals(this.value);
    }
}