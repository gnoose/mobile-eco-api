import { ApiProperty } from '@nestjs/swagger';

import { CommonDto } from '../../common/dtos/common.dto';
import { MobileModel, OrderStatus, RepairType } from '../../common/models/base';

export class OrderDto extends CommonDto {
  @ApiProperty({ description: "the order owner's name" })
  name: string;

  @ApiProperty({ description: "the order owner's class" })
  class: string;

  @ApiProperty({ description: 'the mobile model' })
  mobileModel: MobileModel;

  @ApiProperty({ description: 'the repair type' })
  repairType: RepairType;

  @ApiProperty({ description: 'the order deadline' })
  deadline: Date;

  @ApiProperty({ description: 'the order amount' })
  amount: number;

  @ApiProperty({ description: 'the order status' })
  status: OrderStatus;
}
