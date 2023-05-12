import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import Address from './entities/address.entity';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ) {}

    async getByEmail(email: string) {
        const user = await this.usersRepository.findOneBy({email});
        if (user) {
            return user;
        }
        throw new HttpException('User with this email does not exits', HttpStatus.NOT_FOUND);
    }

    async create(userData: CreateUserDto) {
        const newUser = await this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async getById(id: number) {
        const user = await this.usersRepository.findOneBy({ id });
        if (user) {
          return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

      
    async getAddressesWithUser(id) {
        return this.addressRepository.find({ relations: ['user'] });
    }
}
