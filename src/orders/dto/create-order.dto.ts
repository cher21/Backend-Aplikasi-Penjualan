import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userid: number;
  total: number;
  price: number;
}
