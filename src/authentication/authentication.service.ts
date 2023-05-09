import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/createUser.dto';
import PostgresErrorCode from '../db/postgresErrorCodes.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    public async register(registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
          const createdUser = await this.usersService.create({
            ...registrationData,
            password: hashedPassword
          });
          createdUser.password = undefined;
          return createdUser;
        } catch (error) {
          if (error?.code === PostgresErrorCode.UniqueViolation) {
            throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
          }
          throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAuthenticatedUser(email: string, password: string) {
      try {
        
        const user = await this.usersService.getByEmail(email);
        await this.verifyPassword(password, user.password);
        user.password = undefined;
        return user;
      } catch (error) {
        return new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }

    private async verifyPassword(plainText: string, hash: string) {
      const isPasswordMatching = await bcrypt.compare(
        plainText,
        hash
      );
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }

    public getCookieWithJwtToken(userId: number) {
      const payload: TokenPayload = { userId };
      const token = this.jwtService.sign(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieForLogOut() {
      return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
