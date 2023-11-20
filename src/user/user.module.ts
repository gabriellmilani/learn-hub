import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports: [DatabaseModule, ClassModule],
  providers: [
    ...userProviders,  
    UserService
  ],
  controllers: [UserController],
  exports: [UserService]
})

export class UserModule {}
