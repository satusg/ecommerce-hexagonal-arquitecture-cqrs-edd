import { BaseError } from '../../../shared/domain/errors/base.error'

export class UserNotFoundError extends BaseError {
    constructor(id: string) {
        super(`User with ID "${id}" was not found.`, 404);
    }
}
