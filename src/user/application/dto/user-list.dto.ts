import { UserResponseDto } from "./user-response.dto";

class UserListDto {
    constructor(
        public readonly users: UserResponseDto[]
    ) { }
}