// src/user/infrastructure/repositories/in-memory-user.repository.ts
import User from 'src/user/domain/entitites/user.entity';
import UserRepository from 'src/user/domain/interfaces/UserRepository.interface';
import { UserId } from 'src/user/domain/value-objects/user-id.vo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
    private readonly users = new Map<string, User>();

    async save(user: User): Promise<void> {
        this.users.set(user.getId().toString(), user);
    }

    async delete(user: User): Promise<void> {
        this.users.delete(user.getId().toString());
    }

    async getById(userId: UserId): Promise<User | null> {
        return this.users.get(userId.toString()) ?? null;
    }

    async getAll(): Promise<User[]> {
        return [...this.users.values()];
    }
}
