import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: UserEntity,
    isArray: true,
  })
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }
}
