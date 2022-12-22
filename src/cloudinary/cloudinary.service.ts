import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadBase64(file: string): Promise<string> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(file, (error, result) => {
        if (error) return reject(error);
        if (result) {
          resolve(result.public_id);
        }
      });
    });
  }

  async deleteImage(id: string) {
    return new Promise<void>((resolve, reject) => {
      v2.uploader.destroy(id, (error) => {
        if (error) return reject(error);
        resolve();
      });
    });
  }
}
