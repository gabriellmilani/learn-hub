import { Controller, Post, Body, HttpStatus, Res, Get } from '@nestjs/common';
import { ClassService } from './class.service';
import { Response } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { ClassCreateDto } from './dto/class-create.dto';
import { UserType } from 'src/user/enum/user-type.enum';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) { }

  @Post()
  @Roles(UserType.Admin)
  async create(@Body() classCreateDto: ClassCreateDto, @Res() res: Response) {
    const entityClass = await this.classService.create(classCreateDto);
    res.status(HttpStatus.CREATED).send(entityClass);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

}
