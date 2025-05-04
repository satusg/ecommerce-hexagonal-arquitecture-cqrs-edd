import { BaseError } from "../../../shared/domain/errors/base.error";

export class InvalidUserRoleError extends BaseError {
    constructor(role: string) {
        super(`Invalid user role: "${role}".`, 422);
    }
}