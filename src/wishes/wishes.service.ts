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
    console.log(wishId);
    return await this.wishRepository.findOne({
      where: {
        id: wishId,
      },
      relations: {
        owner: {
          wishes: true,
          wishLists: true,
          offers: true,
        },
        offers: true,
      },
    });
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return `This action updates a #${id} wish`;
  }

  remove(id: number) {
    return `This action removes a #${id} wish`;
  }
}
