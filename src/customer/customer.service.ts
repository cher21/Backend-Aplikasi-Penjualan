import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { customer, users } from 'models';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(customer)
    private customerModel: typeof customer,
    private sequelize: Sequelize,
  ) {}

  async custxUser(): Promise<any> {
    try {
      const result = await customer.findAll({
        include: [
          {
            model: users,
          },
        ],
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  findAll() {
    const result = customer.findAll();
    return result;
  }

  async getId(id: string): Promise<any> {
    const result = await customer.findByPk(id);
    return result;
  }

  async input(cust: any): Promise<any> {
    const result = await customer.create({
      firstname: cust.fname,
      lastname: cust.lname,
      user_id: cust.userid,
      createdat: new Date(),
    });
    return result;
  }

  async update(cust: any, id: number): Promise<any> {
    const result = await customer.update(
      {
        firstname: cust.fname,
        lastname: cust.lname,
        user_id: cust.userid,
        updateat: new Date(),
      },
      {
        where: {
          cust_id: id,
        },
      },
    );
    return result;
  }

  async delete(id: string): Promise<any> {
    const result = await customer.destroy({
      where: {
        cust_id: id,
      },
    });
    return result;
  }

  async findAllJoinSP(): Promise<any> {
    try {
      const result = await this.sequelize.query(
        'select * from "customerOrderDetail"',
      );
      return result;
    } catch (err) {
      return err;
    }
  }

  async customerUser(): Promise<any> {
    try {
      const result = await this.sequelize.query('select * from "customerUser"');
      return result;
    } catch (err) {
      return err;
    }
  }
}
