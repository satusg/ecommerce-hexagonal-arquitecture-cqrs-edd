// src/user/domain/repositories/user.repository.ts
import User from '../entitites/user.entity';
import { UserId } from '../value-objects/user-id.vo';

export default interface UserRepository {
  save(user: User): Promise<void>;
  delete(user: User): Promise<void>;
  getById(userId: UserId): Promise<User | null>;
  getAll(): Promise<User[]>;
}
