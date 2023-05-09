import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import Post from './entities/post.entity';
import PostNotFoundException from './exception/postNotFound.exception';

@Injectable()
export default class PostsService {

    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>
    ) {}


    getAllPosts() {
        return this.postsRepository.find();
    }

    async getPostById(id: number) {
        const post = await this.postsRepository.findOneBy({id});
        if (post) {
            return post;
        }

        throw new PostNotFoundException(id);
    }

    async updatePost(id: number, post: UpdatePostDto) {
        await this.postsRepository.update(id, post);
        const updatedPost = await this.postsRepository.findOneBy({id});
        if (updatedPost) {
          return updatedPost
        }
        throw new PostNotFoundException(id);
      }

      async createPost(post: CreatePostDto) {
        const newPost = await this.postsRepository.create(post);
        await this.postsRepository.save(newPost);
        return newPost;
      }

    
    async deletePost(id: number) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}
