import { Injectable } from '@nestjs/common';
import { users } from 'models';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  async getAll(): Promise<any> {
    const result = await users.findAll({
      order: [['user_id', 'ASC']],
    });
    return result;
  }

  async getId(id: string): Promise<any> {
    const result = await users.findByPk(id);
    return result;
  }

  async delete(id: string): Promise<any> {
    const result = await users.destroy({
      where: {
        user_id: id,
      },
    });
    return result;
  }

  async input(user: any): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(user.pass, salt);
    const result = await users.create({
      username: user.name,
      user_password: passHash,
      createdat: new Date(),
    });
    return result;
  }

  async update(id: number, user: any): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(user.pass, salt);
    const result = await users.update(
      {
        username: user.name,
        user_password: passHash,
        updateat: new Date(),
      },
      {
        where: {
          user_id: id,
        },
      },
    );
    return result;
  }

  //OUTPUT STRING
  getHello(): string {
    return 'Hello World! User';
  }
  getHelloId(): string {
    return 'Hello by ID User';
  }
  putHello(): string {
    return 'Hello PUT User';
  }
  postHello(): string {
    return 'Hello POST user';
  }
  deleteHello(): string {
    return 'Hello DELETE User';
  }
}
