// src/user/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body, Get, Param, NotFoundException, HttpStatus, HttpCode, Header } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { GetUserByIdQuery } from '../../application/queries/get-user-by-id.query';
import { ListUsersQuery } from '../../application/queries/list-users.query';
import { UserResponseDto } from '../../application/dto/user-response.dto';
import { UserListDto } from '../../application/dto/user-list.dto';
import { UserMapper } from '../../application/mapper/user.mapper';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error'

@Controller('users')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() dto: any): Promise<void> {
        console.log(dto);
        const command = new CreateUserCommand(
            dto.id,
            dto.firstName,
            dto.lastName,
            dto.email,
            dto.password,
            dto.role,
        );
        await this.commandBus.execute(command);
    }

    @Get()
    async listUsers(): Promise<UserListDto> {
        const users = await this.queryBus.execute(new ListUsersQuery());
        return UserMapper.toListDto(users);
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserResponseDto> {
        const query = new GetUserByIdQuery(id);
        try {
            const user = await this.queryBus.execute(query);
            return UserMapper.toResponseDto(user);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
}
