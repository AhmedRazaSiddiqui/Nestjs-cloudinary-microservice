import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('create-message')
  async handleUserCreated() {
    // business logic
    console.log('test micro service');
  }

  @MessagePattern({ cmd: 'upload-image' })
  async handleFindUser(data: string): Promise<string> {
    return await this.cloudinaryService.uploadBase64(data);
  }
}
