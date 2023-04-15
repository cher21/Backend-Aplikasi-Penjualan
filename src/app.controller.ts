import { Controller, Get, Put, Post, Delete } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ByID')
  getHelloById(): string {
    return this.appService.getHelloById();
  }

  @Put()
  putHello(): string {
    return this.appService.putHello();
  }

  @Post()
  postHello(): string {
    return this.appService.postHello();
  }

  @Delete()
  deleteHello(): string {
    return this.appService.deleteHello();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): string {
  //   return `Menampilkan id ke-${id}`;
  // }
}
