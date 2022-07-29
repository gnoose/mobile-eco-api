import { ApiProperty } from '@nestjs/swagger';

export class OrderAmountUpdateDto {
  @ApiProperty({ description: 'UUID of the object' })
  id: string;

  @ApiProperty({ description: 'the order amount' })
  amount: number;
}
