import { ConfigOptions, v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: (): ConfigOptions =>
    v2.config({
      cloud_name: 'dfh3z8tak',
      api_key: '549341194885578',
      api_secret: 'webk51twHZ6x4elPumyTzkNOvmk',
    }),
};
