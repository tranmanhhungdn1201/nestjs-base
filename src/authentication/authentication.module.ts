import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [UsersModule, PassportModule],
    providers: [AuthenticationService, LocalStrategy],
    controllers: [AuthenticationController]
})
export class AuthenticationModule {}
