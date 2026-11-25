import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PostService {
    constructor(private readonly prisma:PrismaService){}

    findAll(){
        return this.prisma.post.findMany();
    }
}
