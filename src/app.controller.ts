import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.service';
import { HealthResponse } from './common/models/health.response';

@Controller('api/v0')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Get if server is running or not' })
  @ApiOkResponse({ type: () => HealthResponse })
  health(): HealthResponse {
    return new HealthResponse();
  }
}
