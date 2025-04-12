import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getData() {
    return { message: 'Hello API' };
  }

  @Get('test')
  test() {
    return { message: 'Test endpoint works!' };
  }
}
