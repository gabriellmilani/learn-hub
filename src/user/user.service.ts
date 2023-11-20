import { Injectable, Inject, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserCreateDTO } from './dto/user-create.dto';
import { hash } from 'bcrypt';
import { ClassService } from 'src/class/class.service';


@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY') private usersRepository: Repository<User>,
    private readonly classService: ClassService
  ) {}

  async create(userCreateDto: UserCreateDTO): Promise<User> {
    const passwordHashed = await hash(userCreateDto.password, 10);
    return this.usersRepository.save({
      ...userCreateDto,
      password: passwordHashed
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  registerClass(userId: number, classId: number) {
    let user = this.usersRepository.findOneBy({id: userId})
    .then(async (user) => {
      const entityClass = await this.classService.findOne(classId);
      user.classes = [entityClass];
      this.usersRepository.save(user);
    })
    .catch((error) => {
      throw new HttpException('Erro ao matricular turma', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({email: email});
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if(!user) {
      throw new NotFoundException('User not found');
    }

    return user;
}

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

}
