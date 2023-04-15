import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createPoductDto: CreateProductDto) {
    return this.productService.update(+id, createPoductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPoductDto: CreateProductDto,
  ) {
    const result = await this.productService.uploadFile(file, createPoductDto);
    return { message: 'Upload file sukses', result };
  }

  @Get('image/:image')
  getImage(@Param('image') image: any, @Res() res: any) {
    return this.productService.getImage(image, res);
  }

  @Delete('upload/:id')
  deleteImg(@Param('id') id: number) {
    return this.productService.deleteImage(id);
  }

  @Put('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateImg(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProducrDto: CreateProductDto,
    @Param('id') id: number,
    @Req() req: any,
  ) {
    const result = await this.productService.updateImage(
      file,
      createProducrDto,
      id,
      req,
    );
    return { message: 'Berhasil diperbaharui', result };
  }
}
