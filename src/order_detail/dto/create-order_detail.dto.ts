import { IsNotEmpty } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty()
  orderid: number;
  prodid: number;
  qty: number;
}
