export class UserResponseDto {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly role: string,
        readonly createdAt: string,
        readonly updatedAt: string,
    ) { }
}