import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/infrastructure/user.module';
import { UserController } from './user/infrastructure/controllers/user.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [UserModule, CqrsModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
