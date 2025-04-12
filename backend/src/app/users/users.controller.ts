import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import type { User, ApiResponse } from '@nx-user-hub/shared-types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): ApiResponse<User[]> {
    const users = this.usersService.findAll();
    return {
      data: users,
      message: 'Users retrieved successfully',
      status: HttpStatus.OK,
      timestamp: new Date(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<User | undefined> {
    const user = this.usersService.findOne(id);
    return {
      data: user,
      message: user ? 'User retrieved successfully' : 'User not found',
      status: user ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      timestamp: new Date(),
    };
  }

  @Post()
  create(
    @Body() userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ): ApiResponse<User> {
    const user = this.usersService.create(userData);
    return {
      data: user,
      message: 'User created successfully',
      status: HttpStatus.CREATED,
      timestamp: new Date(),
    };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() userData: Partial<User>
  ): ApiResponse<User | undefined> {
    const user = this.usersService.update(id, userData);
    return {
      data: user,
      message: user ? 'User updated successfully' : 'User not found',
      status: user ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      timestamp: new Date(),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<boolean> {
    const success = this.usersService.remove(id);
    return {
      data: success,
      message: success ? 'User deleted successfully' : 'User not found',
      status: success ? HttpStatus.OK : HttpStatus.NOT_FOUND,
      timestamp: new Date(),
    };
  }
}
