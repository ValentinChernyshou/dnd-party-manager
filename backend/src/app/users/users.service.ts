import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({ email });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepo.update(id, userData);
    return this.userRepo.findOneBy({ id });
  }

  async getUser(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const existingUser = await this.getUserByEmail(userData.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      const user = this.userRepo.create(userData);
      return await this.userRepo.save(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Error creating user');
    }
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepo.remove(user);
      return { message: 'User successfully deleted' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new ConflictException('Error deleting user');
    }
  }
}
