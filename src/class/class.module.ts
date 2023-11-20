import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { classProviders } from './class.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...classProviders,
    ClassService
  ],
  controllers: [ClassController],
  exports: [ClassService]
})
export class ClassModule {}
