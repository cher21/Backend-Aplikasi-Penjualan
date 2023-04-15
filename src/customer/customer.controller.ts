import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('CustxUser')
  async getAll(): Promise<any[]> {
    const result = await this.customerService.custxUser();
    return result;
  }

  @Get('view/1')
  async view(): Promise<any[]> {
    const result = await this.customerService.findAllJoinSP();
    return result;
  }

  @Get('view/2')
  async view2(): Promise<any[]> {
    const result = await this.customerService.customerUser();
    return result;
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  async getId(@Param('id') id: string): Promise<any[]> {
    const result = await this.customerService.getId(id);
    return result;
  }

  @Post()
  async create(@Body() cust: string): Promise<any[]> {
    const result = await this.customerService.input(cust);
    return result;
  }

  @Put(':id')
  async update(@Body() cust: string, @Param('id') id: number): Promise<any[]> {
    const result = await this.customerService.update(cust, id);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any[]> {
    const result = await this.customerService.delete(id);
    return result;
  }
}
