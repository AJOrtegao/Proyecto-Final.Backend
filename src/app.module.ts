import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { Product } from './products/product.entity';
import { User } from './users/user.entity';
import { Payment } from './payments/payment.entity';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Order, OrderItem, Product, User, Payment],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/farmacia'),

    ProductsModule,
    OrdersModule,
    AuthModule,
    UsersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
