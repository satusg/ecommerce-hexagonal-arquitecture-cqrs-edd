// src/user/infrastructure/controllers/user.controller.ts
import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from 'src/user/application/dto/create-user.dto';
import { CreateUserCommand } from 'src/user/application/commands/create-user.command';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id.query';
import { UserNotFoundError } from 'src/user/domain/errors/user-not-found.error';

@Controller('users')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const command = new CreateUserCommand(
            dto.id,
            dto.firstName,
            dto.lastName,
            dto.email,
            dto.password,
            dto.role,
        );

        const user = await this.commandBus.execute(command);

        return {
            message: 'User created successfully',
            data: {
                id: user.getId().toString(),
                name: user.getName().toString(),
                email: user.getEmail().toString(),
                role: user.getRole().toString(),
                createdAt: user.getCreatedAt().toISOString(),
            },
        };
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
