import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [UsersModule],
    providers: [AuthenticationService],
    controllers: [AuthenticationController]
})
export class AuthenticationModule {}
