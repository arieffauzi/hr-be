import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.dataSource
      .getRepository(User)
      .save(createUserDto);
    return result;
  }

  findAll() {
    const result = this.dataSource.getRepository(User).find();
    return result;
  }

  findOne(id: number) {
    return this.dataSource.getRepository(User).findOne({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
