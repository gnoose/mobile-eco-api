import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from './entities/order.entity';
import { OrderRegisterDto } from './dtos/order-register.dto';
import { getFromDto } from '../common/utils/repository.util';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async addOrder(
    dto: OrderRegisterDto,
    throwErrors = true,
  ): Promise<OrderEntity> {
    const order = getFromDto<OrderEntity>(dto, new OrderEntity());
    return this.orderRepository.save(order);
  }

  async updateOrder(order: OrderEntity): Promise<OrderEntity> {
    return this.orderRepository.save(order);
  }

  async count(): Promise<number> {
    return this.orderRepository.count();
  }

  async find(): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      order: {
        status: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<OrderEntity> {
    return this.orderRepository.findOne({
      where: {
        id,
      },
    });
  }

  async removeById(id: string): Promise<boolean> {
    const order = await this.findById(id);
    await this.orderRepository.remove(order);
    return true;
  }
}
