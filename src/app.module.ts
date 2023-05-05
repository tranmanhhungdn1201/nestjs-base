import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactInfo } from './contact-info.entity';
import { dataSourceOptions } from './db/data-source';
import { Employee } from './employee.entity';
import { Meeting } from './metting.entity';
import { Task } from './task.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    TypeOrmModule.forFeature([Employee, ContactInfo, Meeting, Task]),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
