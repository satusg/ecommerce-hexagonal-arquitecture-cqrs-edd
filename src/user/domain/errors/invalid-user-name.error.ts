import { BaseError } from "src/shared/domain/errors/base.error";
import { USER_NAME_MIN_LENGTH } from "../value-objects/user-name.vo";
export class InvalidUserNameError extends BaseError {
  constructor(value: string) {
    super(`Invalid user name: "${value}". It must be at least ${USER_NAME_MIN_LENGTH} characters long.`, 422);
  }
}
