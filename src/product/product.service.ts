import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { product } from 'models';
// import multer from 'multer';
// import path from 'path';
// import sequelize from 'sequelize';
import * as fs from 'fs';
import { join, basename } from 'path';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    const result = product.create({
      prod_name: createProductDto.name,
      description: createProductDto.desc,
      category_id: createProductDto.cateid,
      price: createProductDto.price,
      image: createProductDto.img,
      createdat: new Date(),
    });
    return result;
  }

  findAll() {
    const result = product.findAll({ order: [['prod_id', 'ASC']] });
    return result;
  }

  findOne(id: number) {
    const result = product.findByPk(id);
    return result;
  }

  update(id: number, createProductDto: CreateProductDto) {
    const result = product.update(
      {
        prod_name: createProductDto.name,
        description: createProductDto.desc,
        category_id: createProductDto.cateid,
        price: createProductDto.price,
        image: createProductDto.img,
        updateat: new Date(),
      },
      {
        where: {
          prod_id: id,
        },
      },
    );
    return result;
  }

  remove(id: number) {
    product.destroy({
      where: {
        prod_id: id,
      },
    });
    return `Produk dengan id-${id} telah terhapus`;
  }

  async uploadFile(
    file: Express.Multer.File,
    createProductDto: CreateProductDto,
  ): Promise<any> {
    const { originalname, buffer } = file;
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    const fileName = `${uniqueSuffix}-${originalname}`;
    const filePath = `./uploads/${fileName}`;
    fs.writeFileSync(filePath, buffer);
    try {
      const finalImageUrl = '/product/image/' + fileName;
      const result = product.create({
        prod_name: createProductDto.name,
        description: createProductDto.desc,
        category_id: createProductDto.cateid,
        price: createProductDto.price,
        image: finalImageUrl,
        createdat: new Date(),
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  async getImage(image: string, res: any) {
    try {
      const imagePath = join(process.cwd(), 'uploads/' + image);
      console.log(imagePath);
      res.sendFile(imagePath);
    } catch (err) {
      return err;
    }
  }

  async deleteImage(id: number) {
    try {
      const produk = await product.findOne({
        where: {
          prod_id: id,
        },
      });

      if (!produk) {
        return 'Produk tidak ditemukan';
      }

      const imageUrl = produk.image;
      console.log(imageUrl);
      const imageFileName = imageUrl.split('/').pop();
      console.log(imageFileName);
      const imagePath = join(process.cwd(), 'uploads/' + imageFileName);
      console.log(imagePath);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        await product.destroy({
          where: {
            prod_id: id,
          },
        });
      }
      return `Produk dengan id-${id} telah terhapus`;
    } catch (err) {
      return err;
    }
  }

  async updateImage(
    file: Express.Multer.File,
    createProductDto: CreateProductDto,
    id: any,
    req: any,
  ) {
    try {
      const produk = await product.findOne({ where: { prod_id: id } });
      if (!produk) {
        return 'File tidak tersedia';
      }

      let finalImageUrl = produk.image;
      if (file) {
        const { originalname, buffer } = file;
        const uniqueSuffix = Math.round(Math.random() * 1e9);
        const fileName = `${uniqueSuffix}-${originalname}`;
        const filePath = `./uploads/${fileName}`;
        fs.writeFileSync(filePath, buffer);

        finalImageUrl =
          // req.protocol + '://' + req.get('host') +
          '/product/image/' + fileName;
        console.log(finalImageUrl);
        const oldImagePath = './uploads/' + basename(produk.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const result = await produk.update({
        prod_name: createProductDto.name,
        description: createProductDto.desc,
        category_id: createProductDto.cateid,
        price: createProductDto.price,
        image: finalImageUrl,
        updateat: new Date(),
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}
