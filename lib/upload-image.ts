import { put } from '@vercel/blob';

/* 
npm install browser-image-compression 
import imageCompression from 'browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
});
*/

type UploadImageParams = {
  image: File;
  fileName: string;
  url: string;
  order: string;
};

export async function uploadImage({
  image,
  fileName,
  url,
  order,
}: UploadImageParams) {
  const env = process.env.NODE_ENV;
  const extension = image.name.split('.').pop() as string;
  const fileUrl = `${env}${url}/${fileName}_${order}.${extension}`;
  const blob = await put(fileUrl, image, {
    access: 'public',
    allowOverwrite: true,
  });

  return blob.url;
}
