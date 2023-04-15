import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { orders } from 'models';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    const result = orders.create({
      user_id: createOrderDto.userid,
      totalproduct: createOrderDto.total,
      totalprice: createOrderDto.price,
      createdat: new Date(),
    });
    return result;
  }

  findAll() {
    const result = orders.findAll();
    return result;
  }

  findOne(id: number) {
    const result = orders.findByPk(id);
    return result;
  }

  update(id: number, createOrderDto: CreateOrderDto) {
    const result = orders.update(
      {
        user_id: createOrderDto.userid,
        totalproduct: createOrderDto.total,
        totalprice: createOrderDto.price,
        updateat: new Date(),
      },
      {
        where: {
          order_id: id,
        },
      },
    );
    return result;
  }

  remove(id: number) {
    orders.destroy({
      where: {
        order_id: id,
      },
    });
    return `Order dengan id-${id} telah terhapus`;
  }
}
