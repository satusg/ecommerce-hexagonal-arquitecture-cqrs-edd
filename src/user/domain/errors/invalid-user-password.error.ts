import { BaseError } from "src/shared/domain/errors/base.error";

export class InvalidUserPasswordError extends BaseError {
    constructor(reason = 'Password must be at least 8 characters') {
        super(`Invalid user password: ${reason}`, 422);
    }
}
