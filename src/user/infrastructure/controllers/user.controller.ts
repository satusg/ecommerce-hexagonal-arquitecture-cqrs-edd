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
        const dtos = users.map(u => new UserResponseDto(
            u.getId().toString(),
            u.getName().toString(),
            u.getEmail().toString(),
            u.getRole().toString()
        ));
        return new UserListDto(dtos);
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        const query = new GetUserByIdQuery(id);
        try {
            const user = await this.queryBus.execute(query);

            return {
                id: user.getId().toString(),
                name: user.getName().toString(),
                email: user.getEmail().toString(),
                role: user.getRole().toString(),
                createdAt: user.getCreatedAt().toISOString(),
            };
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
}
