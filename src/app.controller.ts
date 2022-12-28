import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response, Request } from 'express';

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

  @Post('local-upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload-assets',
        filename: (_req, file, callback) => {
          console.log(file);
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @Get('stream')
  getFile(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const file = './upload-assets/test.mp4';
    const readStream = createReadStream(file);
    readStream.on('data', (chunk) => console.log(chunk));
    readStream.on('finish', () => console.log('done'));
    res.set({
      'Content-Type': 'video/mp4',
    });
    return new StreamableFile(readStream);
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
