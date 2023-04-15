import { Controller, Post, Body, SetMetadata } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @SetMetadata('IS_PUBLIC_KEY', true)
  @Post()
  async login(@Body() createLoginDto: CreateLoginDto) {
    const accessToken = await this.loginService.login(createLoginDto);
    if (!accessToken) {
      return { message: 'Username atau password salah' };
    }
    return { accessToken };
  }
}
