import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
