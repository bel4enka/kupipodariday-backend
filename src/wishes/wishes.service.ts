import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(user: User, createWishDto: CreateWishDto) {
    return await this.wishRepository.save({
      ...createWishDto,
      owner: user,
    });
  }

  findAll() {
    return this.wishRepository.find();
  }

  findLastWishes() {
    return this.wishRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  findTopWishes() {
    return this.wishRepository.find({
      order: {
        copied: 'DESC',
      },
      where: {
        copied: MoreThan(0),
      },
    });
  }

  findWishesByUserId(userId: number) {
    return this.wishRepository.find({
      where: { owner: { id: userId } },
      order: { updateAt: 'DESC' },
    });
  }

  async findOne(wishId: number): Promise<Wish> {
    return await this.wishRepository.findOne({
      where: {
        id: wishId,
      },
      relations: {
        owner: {
          wishes: true,
          wishLists: true,
        },
        offers: {
          user: true,
          item: true,
        },
      },
    });
  }

  async update(id: number, ...param) {
    //вместо param тут было UpdateWishDto, но не поняла как менять отдельно copied
    return await this.wishRepository.update(id, param[0]);
  }

  async remove(id: number) {
    return await this.wishRepository.delete({ id });
  }
}
