import { getAllPostsFromNotion } from '@/services/posts';

export default async function CachePage() {
  const allPosts = await getAllPostsFromNotion();

  return <div id="posts" data-posts={JSON.stringify(allPosts)} />;
}
