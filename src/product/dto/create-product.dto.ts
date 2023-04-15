// import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  name: string;

  desc: string;

  cateid: number;

  price: number;
  img: string;
}
