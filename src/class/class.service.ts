import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClassCreateDto } from './dto/class-create.dto';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {

    constructor(
        @Inject('CLASS_REPOSITORY')
        private classRepository: Repository<Class>,
    ) { }

    async create(classCreateDto: ClassCreateDto) {
        const entityClass = new Class();
        entityClass.teacher = classCreateDto.teacher;
        entityClass.matter = classCreateDto.matter;
        entityClass.date = classCreateDto.date;
        entityClass.shift = classCreateDto.shift;

        return this.classRepository.save(entityClass)
            .then((result) => {
                return result;
            }).catch((error) => {
                console.log(error);
                throw new HttpException('Erro ao cadastrar turma', HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    findAll(): Promise<Class[]> {
        return this.classRepository.find();
    }

    async findOne(id: number): Promise<Class | undefined> {
        return this.classRepository.findOneBy({ id: id });
    }
    
}
