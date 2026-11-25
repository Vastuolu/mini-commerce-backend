import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service.js';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(){
    return this.postService.findAll();
  }
}
