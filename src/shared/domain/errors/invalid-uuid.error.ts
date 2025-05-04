import { BaseError } from './base.error';

export class InvalidUUIDError extends BaseError {
  constructor(uuid: string) {
    super(`Invalid UUID format: ${uuid}`, 422);
  }
}
