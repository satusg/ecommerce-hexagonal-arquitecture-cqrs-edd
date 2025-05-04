import { UserResponseDto } from "./user-response.dto";

export class UserListDto {
    constructor(
        public readonly users: UserResponseDto[]
    ) { }
}