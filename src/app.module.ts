import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    ProductCategoryModule,
    OrdersModule,
    OrderDetailModule,
    LoginModule,
  ],
})
export class AppModule {}
