import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Javascript';
  }
  getHelloById(): string {
    return 'Hello by Id';
  }
  putHello(): string {
    return 'Hello method PUT';
  }
  postHello(): string {
    return 'Hello method POST';
  }
  deleteHello(): string {
    return 'Hello methode DELETE';
  }
}
