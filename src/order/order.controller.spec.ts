import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { configService } from '../config/config.service';
import { MobileModel, OrderStatus, RepairType } from '../common/models/base';

describe('OrderController', () => {
  let orderController: OrderController;
  let app: INestApplication;
  const regOrder = {
    name: 'testOrder',
    class: 'orderClass',
    mobileModel: MobileModel.iphone,
    repairType: RepairType.line,
    deadline: new Date().toLocaleString(),
    amount: 0,
    status: OrderStatus.initial,
  };
  const orderService = {
    find: () => [],
    addOrder: (dto) => dto,
    findById: (id) => regOrder,
    updateOrder: (order) => order,
  };

  beforeEach(async () => {
    const orderModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([OrderEntity]),
      ],
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(orderService)
      .compile();

    orderController = orderModule.get<OrderController>(OrderController);
    app = orderModule.createNestApplication();
    await app.init();
  });

  it('/GET order', async () => {
    return request(app.getHttpServer())
      .get('/api/v0/order')
      .expect(200)
      .expect(orderService.find());
  });

  it('/POST order', async () => {
    return request(app.getHttpServer())
      .post('/api/v0/order')
      .send(regOrder)
      .expect(201)
      .expect(regOrder);
  });

  it('/PUT order amount', async () => {
    const updatedOrder = regOrder;
    updatedOrder.amount = 100;
    updatedOrder.status = OrderStatus.estimated;
    return request(app.getHttpServer())
      .put('/api/v0/order/amount')
      .send({ id: 'id-1', amount: updatedOrder.amount })
      .expect(200)
      .expect(updatedOrder);
  });

  it('/PUT order status', async () => {
    const updatedOrder = regOrder;
    updatedOrder.status = OrderStatus.agreed;
    return request(app.getHttpServer())
      .put('/api/v0/order/status')
      .send({ id: 'id-1', status: updatedOrder.status })
      .expect(200)
      .expect(updatedOrder);
  });
});
