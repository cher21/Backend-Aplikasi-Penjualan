import { IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  desc: string;
}
