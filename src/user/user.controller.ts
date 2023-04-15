import { Controller, Get, Delete, Param, SetMetadata } from '@nestjs/common';
import { Body, Post, Put, UseGuards } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { RolesGuard } from 'src/login/tokenGuard';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SetMetadata('IS_PUBLIC_KEY', true)
  async getAll(): Promise<any[]> {
    const result = await this.userService.getAll();
    return result;
  }
  @Get(':id')
  @SetMetadata('IS_PUBLIC_KEY', true)
  async getUserId(@Param('id') id: string): Promise<any[]> {
    const result = await this.userService.getId(id);
    return result;
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any[]> {
    const result = await this.userService.delete(id);
    return result;
  }
  @Post()
  @SetMetadata('IS_PUBLIC_KEY', true)
  async create(@Body() user: any): Promise<any[]> {
    const result = await this.userService.input(user);
    return result;
  }
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: any): Promise<any[]> {
    const result = await this.userService.update(id, user);
    return result;
  }

  //OUTPUT STRING
  // @Get()
  // getHello(): string {
  //   return this.userService.getHello();
  // }
  @Get('ById')
  getId(): string {
    return this.userService.getHelloId();
  }
  @Put()
  getPut(): string {
    return this.userService.putHello();
  }
  @Post()
  getPost(): string {
    return this.userService.postHello();
  }
  // @Delete()
  // getDelete(): string {
  //   return this.userService.deleteHello();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string): string {
  //   return `Menampilkan user ${id}`;
  // }
}
