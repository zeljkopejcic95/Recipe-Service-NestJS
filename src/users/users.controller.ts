import { Controller, Get, Patch, Post } from '@nestjs/common';
import { Body, UseGuards } from '@nestjs/common/decorators';
import { User } from '@prisma/client';
import { GetUser } from './decorator';
import { EditUserDto, RegisterLoginUserDto } from './dto';
import { JwtGuard } from './guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() dto: RegisterLoginUserDto) {
    return this.usersService.register(dto);
  }

  @Post('login')
  login(@Body() dto: RegisterLoginUserDto) {
    return this.usersService.login(dto);
  }

  @UseGuards(JwtGuard)
  @Get('current')
  currentUser(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.usersService.editUser(userId, dto);
  }
}
