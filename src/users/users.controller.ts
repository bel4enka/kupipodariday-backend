import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from '../guards/jwt.guard';
import { WishesService } from '../wishes/wishes.service';
import { Wish } from '../wishes/entities/wish.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  async findUser(@Req() req: any) {
    const { username } = req.user;
    return this.usersService.findByUsername(username);
  }

  @Get(':username')
  async findUserByUserName(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get('me/wishes')
  findWishesMyUser(@Req() req): Promise<Wish[]> {
    const { id } = req.user;
    return this.wishesService.findWishesByUserId(id);
  }

  @Get(':username/wishes')
  async findWishesByUserName(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    return await this.wishesService.findWishesByUserId(user.id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('find')
  public async findMany(@Body() user): Promise<User[]> {
    return this.usersService.findUsers(user);
  }

  @Patch('me')
  async update(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const { id } = req.user;
    return this.usersService.update(id, updateUserDto);
  }
}
