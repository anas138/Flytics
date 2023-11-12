import { BlobServiceClient } from '@azure/storage-blob';
import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class ImageService {
  azureConnection = process.env.AZURE_STORAGE_CONNECTION_STRING;
  containerName = process.env.AZURE_OPERATOR_CONTAINER_NAME;

  validateImageFile(file) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      //Size check 20MB = 20000000 bytes
      if (file.size > 20000000)
        throw new BadRequestException('Image size must be less than 20MB.');
      return true;
    } else
      throw new BadRequestException('Image must be in .jpeg or png format.');
  }

  getBlobClient(imageName: string) {
    const blobClientService = BlobServiceClient.fromConnectionString(
      this.azureConnection,
    );
    const containerClient = blobClientService.getContainerClient(
      this.containerName,
    );
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  async uploadImage(image: Express.Multer.File) {
    const file = image[0];
    const imageId = v4();
    try {
      if (this.validateImageFile(file)) {
        const blobClient = this.getBlobClient(imageId);
        await blobClient.uploadData(file.buffer);
        return imageId;
      }
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getFileStream(imageId: string) {
    const blobClient = this.getBlobClient(imageId);
    try {
      const blobDownloaded = await blobClient.download();
      return blobDownloaded.readableStreamBody;
    } catch (err) {
      if (err?.statusCode === 404) {
        throw new NotFoundException('Requested image could not be found.');
      }
    }
  }

  async updateImage(imageId: string, image: Express.Multer.File) {
    let operatorImageId = imageId;
    if (!imageId && imageId !== '') operatorImageId = v4();
    const file = image[0];
    try {
      this.validateImageFile(file);
      const blobClient = this.getBlobClient(operatorImageId);
      blobClient.uploadData(file.buffer);
      return operatorImageId;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
