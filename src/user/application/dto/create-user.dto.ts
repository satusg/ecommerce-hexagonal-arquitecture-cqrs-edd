export class CreateUserDto {
    constructor(
      readonly id: string,
      readonly firstName: string,
      readonly lastName: string,
      readonly email: string,
      readonly password: string,
      readonly role: string
    ) {}
  }
  