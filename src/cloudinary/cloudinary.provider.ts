import { ConfigOptions, v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: (): ConfigOptions =>
    v2.config({
      cloud_name: 'ahmedrscloud',
      api_key: '175238876789643',
      api_secret: 'xApfsw4rxXUSydnY49bISSHiT0g',
      // cloud_name: 'dfh3z8tak',
      // api_key: '549341194885578',
      // api_secret: 'webk51twHZ6x4elPumyTzkNOvmk',
    }),
};

// ltnu5k5dryphykdfmehc;
