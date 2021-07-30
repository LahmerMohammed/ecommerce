import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { ReviewEntity } from './../../database/entities/review.entity';
import { CrudController } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';

@ApiTags('Reviews')
@Crud({
  model: {
    type: ReviewEntity,
  },
})
@Controller('reviews')
export class ReviewController implements CrudController<ReviewEntity>{
  constructor(public service : ReviewService){
  }
}
