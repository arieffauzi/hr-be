import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // const user = await this.dataSource.getRepository(User).findOne({
    //   where: { email },
    // });
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect(['user.password'])
      .getOne();

    if (!user) {
      throw new NotFoundException(`No user found for email ${email}`);
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.dataSource
      .getRepository(Auth)
      .findOne({ where: { user: { id: user.id } } });

    if (token) {
      token.accessToken = this.jwtService.sign({ userId: user.id });
    }

    const authData = {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user,
    };

    const result = await this.dataSource
      .getRepository(Auth)
      .save(token ? token : authData);

    return {
      accessToken: result.accessToken,
    };
  }
}
