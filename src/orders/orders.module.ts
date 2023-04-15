import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { orders } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([orders])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
