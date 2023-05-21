export type Post = {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  cover: string;
  date: string;
  published: boolean;
  lastEditedAt: number;
};
