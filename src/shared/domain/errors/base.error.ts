export abstract class BaseError extends Error {
    constructor(
      public readonly message: string,
      public readonly statusCode: number = 400,
      public readonly cause?: Error,
    ) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  