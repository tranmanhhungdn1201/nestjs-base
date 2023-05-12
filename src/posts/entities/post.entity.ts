import { Transform } from 'class-transformer';
import Category from 'src/categories/category.entity';
import User from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public title: string;
 
  @Column({ nullable: true })
  // @Transform(value => {
  //   if (value !== null) {
  //     return value;
  //   }
  //   return null;
  // })
  public content?: string;

  @Column({ nullable: true })
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];
}
 
export default Post;