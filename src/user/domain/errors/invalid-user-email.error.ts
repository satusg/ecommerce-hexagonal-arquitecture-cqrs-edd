import { BaseError } from "src/shared/domain/errors/base.error";

export class InvalidUserEmailError extends BaseError {
  constructor(email: string) {
    super(`Invalid email format: "${email}"`, 422);
  }
}
