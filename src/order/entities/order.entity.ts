import { Column, Entity } from 'typeorm';

import { SoftDelete } from '../../common/core/soft-delete';
import { OrderDto } from '../dtos/order.dto';
import { MobileModel, RepairType, OrderStatus } from '../../common/models/base';

@Entity('order')
export class OrderEntity extends SoftDelete {
  @Column()
  name: string;

  @Column()
  class: string;

  @Column()
  mobileModel: MobileModel;

  @Column()
  repairType: RepairType;

  @Column()
  deadline: Date;

  @Column({
    default: 0,
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.initial,
  })
  status: OrderStatus;

  toDto(): OrderDto {
    return {
      ...super.toDto(),
      name: this.name,
      class: this.class,
      mobileModel: this.mobileModel,
      repairType: this.repairType,
      deadline: this.deadline,
      amount: this.amount,
      status: this.status,
    };
  }
}
