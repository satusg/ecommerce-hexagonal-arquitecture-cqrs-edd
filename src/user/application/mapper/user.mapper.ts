import { User } from '../../domain/entitites/user.entity'
import { UserResponseDto } from '../dto/user-response.dto';
import { UserListDto } from '../dto/user-list.dto';

export class UserMapper {
    
    static toResponseDto(user: User): UserResponseDto {
        return new UserResponseDto(
            user.getId().toString(),
            user.getName().toString(),
            user.getEmail().toString(),
            user.getRole().toString(),
            user.getCreatedAt().toString(),
            user.getUpdatedAt().toString(),
        );
    }

    static toListDto(users: User[]): UserListDto {
        const dtos = users.map(u => this.toResponseDto(u));
        return new UserListDto(dtos);
    }
}
