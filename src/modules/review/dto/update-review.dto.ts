import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewtDto extends PartialType(CreateReviewDto) {}
