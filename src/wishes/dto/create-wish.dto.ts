import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  image: string;
  price: number;

  @Length(1, 1024, {
    message: 'от 1 до 1024 символов',
  })
  description: string;
}
