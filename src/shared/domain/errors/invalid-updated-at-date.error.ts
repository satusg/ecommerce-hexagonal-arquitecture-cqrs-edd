import { BaseError } from './base.error';

export default class InvalidUpdatedAtDateError extends BaseError {
  constructor(received: any) {
    super(
      `Invalid updatedAt date received: ${String(received)}`,
      422
    );
  }
}
