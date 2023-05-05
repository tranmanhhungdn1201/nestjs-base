import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { Post } from './post.interface';

@Injectable()
export default class PostsService {
    private lastPostId = 0;
    private posts: Post[] = [];

    getAllPosts() {
        return this.posts;
    }

    getPostById(id: number) {
        const post = this.posts.find(post => post.id === id);
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

    createPost(post: CreatePostDto) {
        const newPost = {
            id: ++this.lastPostId,
            ...post
        }
        this.posts.push(newPost);
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
