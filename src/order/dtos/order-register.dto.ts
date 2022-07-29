import { ApiProperty } from '@nestjs/swagger';
import { MobileModel, RepairType } from '../../common/models/base';

export class OrderRegisterDto {
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
}
