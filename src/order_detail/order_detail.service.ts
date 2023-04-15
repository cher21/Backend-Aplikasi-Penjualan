import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { order_detail } from 'models';

@Injectable()
export class OrderDetailService {
  create(createOrderDetailDto: CreateOrderDetailDto) {
    const result = order_detail.create({
      order_id: createOrderDetailDto.orderid,
      product_id: createOrderDetailDto.prodid,
      quantity: createOrderDetailDto.qty,
      createdat: new Date(),
    });
    return result;
  }

  findAll() {
    const result = order_detail.findAll();
    return result;
  }

  findOne(id: number) {
    const result = order_detail.findByPk(id);
    return result;
  }

  update(id: number, createOrderDetailDto: CreateOrderDetailDto) {
    const result = order_detail.update(
      {
        order_id: createOrderDetailDto.orderid,
        product_id: createOrderDetailDto.prodid,
        quantity: createOrderDetailDto.qty,
        updateat: new Date(),
      },
      {
        where: {
          ordet_id: id,
        },
      },
    );
    return result;
  }

  remove(id: number) {
    order_detail.destroy({
      where: {
        ordet_id: id,
      },
    });
    return `Order detail dengan id-${id} telah terhapus`;
  }
}
