import { PickType } from '@nestjs/swagger';

import { Post } from '@/db/pg-main/models';

export class CreatePostDto extends PickType(Post, ['title', 'content', 'userId']) {}
