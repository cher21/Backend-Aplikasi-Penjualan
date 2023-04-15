import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { customer, product, product_category, users } from 'models';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomerController } from 'src/customer/customer.controller';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  imports: [
    SequelizeModule.forFeature([users, customer, product, product_category]),
  ],
  providers: [UserService, CustomerService],
  controllers: [UserController, CustomerController],
})
export class UserModule {}
