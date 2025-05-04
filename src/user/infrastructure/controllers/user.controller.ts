// src/user/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body, Get, Param, NotFoundException, HttpStatus, HttpCode, Header } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from 'src/user/application/dto/create-user.dto';
import { CreateUserCommand } from 'src/user/application/commands/create-user.command';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id.query';
import { UserNotFoundError } from 'src/user/domain/errors/user-not-found.error';
import { UserListDto } from 'src/user/application/dto/user-list.dto';
import { ListUsersQuery } from 'src/user/application/queries/list-users.query';
import { UserResponseDto } from 'src/user/application/dto/user-response.dto';
import { UserMapper } from 'src/user/application/mapper/user.mapper';

@Controller('users')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
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
