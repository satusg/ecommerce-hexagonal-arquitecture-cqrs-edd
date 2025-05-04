import { BaseError } from './base.error';

export default class InvalidCreatedAtDateError extends BaseError {
  constructor(received: any) {
    super(
      `Invalid createdAt date received: ${String(received)}`,
      422
    );
  }
}
