import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { product, product_category } from 'models';

@Injectable()
export class ProductCategoryService {
  create(createProductCategoryDto: CreateProductCategoryDto) {
    const result = product_category.create({
      cate_name: createProductCategoryDto.name,
      description: createProductCategoryDto.desc,
      createdat: new Date(),
    });
    return result;
  }

  findAll() {
    const result = product_category.findAll();
    return result;
  }

  findOne(id: number) {
    const result = product_category.findByPk(id);
    return result;
  }

  update(id: number, createProductCategoryDto: CreateProductCategoryDto) {
    const result = product_category.update(
      {
        cate_name: createProductCategoryDto.name,
        description: createProductCategoryDto.desc,
        updateat: new Date(),
      },
      {
        where: {
          cate_id: id,
        },
      },
    );
    return result;
  }

  remove(id: number) {
    product_category.destroy({
      where: {
        cate_id: id,
      },
    });
    return `Produk category dengan id-${id} telah terhapus`;
  }

  async getCatexProd(): Promise<any> {
    try {
      const result = await product_category.findAll({
        include: [
          {
            model: product,
          },
        ],
      });
      return result;
    } catch (err) {
      return err;
    }
  }
}
