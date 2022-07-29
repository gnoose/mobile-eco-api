import { Body, Controller, Get, NotFoundException, Post, Put, Request } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrderDto } from './dtos/order.dto';
import { OrderService } from './order.service';
import { OrderRegisterDto } from './dtos/order-register.dto';
import { OrderAmountUpdateDto } from './dtos/order-amount-update.dto';
import { OrderStatusUpdateDto } from './dtos/order-status-update.dto';
import { OrderStatus } from '../common/models/base';

@ApiTags('Order')
@Controller('api/v0/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: 'Return all orders' })
  @ApiOkResponse({ type: Array<OrderDto> })
  @Get('')
  async getOrderList(@Request() req): Promise<OrderDto[]> {
    const orderList = await this.orderService.find();
    return orderList.map((item) => item.toDto());
  }

  @ApiOperation({ summary: 'Add new order' })
  @ApiOkResponse({ type: OrderDto })
  @Post('')
  async addOrder(
    @Request() req,
    @Body() dto: OrderRegisterDto,
  ): Promise<OrderDto> {
    return this.orderService.addOrder(dto);
  }

  @ApiOperation({ summary: 'Update Order Amount' })
  @ApiOkResponse({ type: OrderDto })
  @Put('amount')
  async updateOrderAmount(
    @Request() req,
    @Body() dto: OrderAmountUpdateDto,
  ): Promise<OrderDto> {
    const order = await this.orderService.findById(dto.id);
    if (!order) {
      throw new NotFoundException('order not found');
    }
    order.amount = dto.amount;
    order.status = OrderStatus.estimated;
    return this.orderService.updateOrder(order);
  }

  @ApiOperation({ summary: 'Update Order Status' })
  @ApiOkResponse({ type: OrderDto })
  @Put('status')
  async updateOrderStatus(
    @Request() req,
    @Body() dto: OrderStatusUpdateDto,
  ): Promise<OrderDto> {
    const order = await this.orderService.findById(dto.id);
    if (!order) {
      throw new NotFoundException('order not found');
    }
    order.status = dto.status;
    return this.orderService.updateOrder(order);
  }
}
