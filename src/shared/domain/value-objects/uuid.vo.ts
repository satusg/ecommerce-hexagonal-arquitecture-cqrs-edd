import { v7 as uuidv7, validate as validateUUID } from 'uuid';
import { InvalidUUIDError } from '../errors/invalid-uuid.error';
export default class UUID {
    private constructor(private readonly value: string) {
        if (!UUID.isValid(value)) {
            throw new InvalidUUIDError(value);
        }
    }
    static generate(): UUID {
        return new UUID(uuidv7());
    }
    static fromString(id: string): UUID {
        return new this(id);
    }
    static isValid(id: string): boolean {
        return validateUUID(id);
    }
    toString(): string {
        return this.value;
    }
    equals(other: UUID): boolean {
        return this.value === other.value;
    }

}