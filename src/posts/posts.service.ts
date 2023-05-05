import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import Post from './entities/post.entity';

@Injectable()
export default class PostsService {

    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>
    ) {}

    private lastPostId = 0;
    private posts: Post[] = [];

    getAllPosts() {
        return this.postsRepository.find();
    }

    async getPostById(id: number) {
        const post = await this.postsRepository.findOne(id);
        if (post) {
            return post;
        }

        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    replacePost(id: number, post: UpdatePostDto) {
        const postIdx = this.posts.findIndex(post => post.id === id);
        if (postIdx > -1) {
            this.posts[postIdx] = post;
            return post;
        }

        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async createPost(post: CreatePostDto) {
        const newPost = await this.postsRepository.create(post);
        await this.postsRepository.save(newPost);
        return newPost;
    }

    deletePost(id: number) {
        const postIdx = this.posts.findIndex(post => post.id === id);
        if (postIdx > -1) {
            this.posts.splice(postIdx, 1);
        } else {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}
