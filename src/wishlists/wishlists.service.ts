import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishList } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishList)
    private wishListRepository: Repository<WishList>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, wishes, user) {
    return await this.wishListRepository.save({
      ...createWishlistDto,
      owner: user,
      items: wishes,
    });
  }

  findAll() {
    return this.wishListRepository.find({
      relations: {
        items: true,
        owner: true,
      },
    });
  }

  findOne(id: number) {
    return this.wishListRepository.findOne({
      where: { id },
      relations: { items: true, owner: true },
      order: { updateAt: 'DESC' },
    });
  }

  public async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishListRepository.update(id, updateWishlistDto);
  }

  public async remove(id: number): Promise<any> {
    return this.wishListRepository.delete(id);
  }
}
