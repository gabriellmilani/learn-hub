import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserCreateDTO } from './dto/user-create.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';
import { ReturnUserDto } from './dto/return-user.dto';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService,) { }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userCreateDTO: UserCreateDTO, @Res() res: Response) {
    const user = await this.userService.create(userCreateDTO);
    res.status(HttpStatus.CREATED).send(user);
  }

  @Roles(UserType.Admin)
  @Get()
  async findAll() {
    return (await this.userService.findAll()).map(
      (user) => new ReturnUserDto(user)
    );
  }

  @Roles(UserType.User)
  @Post(':userId/class/:classId')
  @UsePipes(ValidationPipe)
  async registerClass(@Param('userId') userId: number, @Param('classId') classId: number) {
    return this.userService.registerClass(userId, classId);
  }

}
