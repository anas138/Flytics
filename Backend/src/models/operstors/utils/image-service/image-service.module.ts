import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageService } from './image-service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageServiceModule {}
