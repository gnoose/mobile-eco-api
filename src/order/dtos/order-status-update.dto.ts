import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../common/models/base';

export class OrderStatusUpdateDto {
  @ApiProperty({ description: 'UUID of the object' })
  id: string;

  @ApiProperty({ description: 'the order status' })
  status: OrderStatus;
}
