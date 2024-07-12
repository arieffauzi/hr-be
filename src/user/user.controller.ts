import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  Request,
  NotFoundException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    const result = await this.userService.create(createUserDto);
    return res.status(200).json({
      statusCode: HttpStatus.OK,
      data: result,
      message: 'Ok',
    });
  }

  @Get()
  async findAll(@Response() res) {
    const result = await this.userService.findAll();
    return res.status(200).json({
      statusCode: HttpStatus.OK,
      data: result,
      message: 'Ok',
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async findOne(@Param('id') id: string, @Response() res) {
    const result = await this.userService.findOne(+id);

    if (!result) {
      throw new NotFoundException(`user with ${id} does not exist`);
    }

    return res.status(200).json({
      status: HttpStatus.OK,
      data: result,
      message: 'Ok',
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
