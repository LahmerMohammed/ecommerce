import { ReviewEntity } from './../../database/entities/review.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewService extends TypeOrmCrudService<ReviewEntity>{
  constructor(@InjectRepository(ReviewEntity) repo){
    super(repo);
  }
}
