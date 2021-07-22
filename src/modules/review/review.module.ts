import { ReviewEntity } from './../../database/entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
