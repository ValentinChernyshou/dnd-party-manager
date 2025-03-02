import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserSeeder implements OnModuleInit {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async onModuleInit() {
      const adminExists = await this.userRepo.findOneBy({ email: 'admin@example.com' });
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin', 10);
        const adminUser = this.userRepo.create({
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'admin',
          name: 'admin',
          surname: 'admin',
        });
        await this.userRepo.save(adminUser);
      }
  }
}
