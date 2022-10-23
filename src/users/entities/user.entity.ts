import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  Length,
  IsEmail,
  MaxLength,
  IsFQDN,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { WishList } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Length(2, 30, {
    message: 'от 2 до 30 символов',
  })
  @Column({
    unique: true,
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({
    unique: true,
  })
  @Column()
  email: string;

  @MaxLength(200, {
    message: 'Слишком большой рассказ о себе',
  })
  @IsOptional()
  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @IsOptional()
  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsFQDN()
  avatar: string;

  @Column({ select: false })
  @IsNotEmpty()
  password: string;

  @IsEmpty()
  @CreateDateColumn()
  createdAt: Date;

  @IsEmpty()
  @UpdateDateColumn()
  updateAt: Date;

  @IsEmpty()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @IsEmpty()
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @IsEmpty()
  @OneToMany(() => WishList, (wishList) => wishList.owner)
  wishLists: WishList[];
}
