import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('Local-Upload')
  @UseInterceptors(FileInterceptor('file', { dest: 'files' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @Get('retrieve-file-from-cloudinary/:id')
  async retrieveFile(@Param() { id }) {
    return await this.cloudinaryService.getFile(id);
  }

  @MessagePattern({ cmd: 'retrieve-file-from-cloudinary' })
  async handleRetrieveFile(id: string) {
    return await this.cloudinaryService.getFile(id);
  }

  @Post('upload-file-to-cloudinary')
  async ingestFile(data: string): Promise<string> {
    return await this.cloudinaryService.uploadBase64(data);
  }

  @MessagePattern({ cmd: 'upload-file-to-cloudinary' })
  async handleIngestFile(data: string): Promise<string> {
    return await this.cloudinaryService.uploadBase64(data);
  }
}
