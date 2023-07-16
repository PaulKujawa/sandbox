export interface Post {
  body: string;
  id: string;
  title: string;
  userId: number;
}

export interface PostDto {
  body: string;
  id: string;
  title: string;
  userId: number;
}

// for a project of that size surely over-engineered
export const mapPostDto = (dto: PostDto): Post => ({
  ...dto,
});
