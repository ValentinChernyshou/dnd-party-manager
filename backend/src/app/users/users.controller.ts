import { Controller, Get, UseGuards, Request, Put, Param, Body, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from "../auth/auth.quard";
import { User } from "./user.entity";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Request() req, @Body() userData: Partial<User>) {
    if (req.user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can create users');
    }
    return this.usersService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Request() req, @Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Request() req, @Param('id') id: number, @Body() userData: Partial<User>) {
    if (req.user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can edit users');
    }
    return this.usersService.updateUser(id, userData);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Request() req, @Param('id') id: number) {
    if (req.user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can delete users');
    }
    return this.usersService.deleteUser(id);
  }
}
