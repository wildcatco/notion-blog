import { getAllPostsFromNotion } from '@/services/posts';

export default async function CachePage() {
  const allPosts = await getAllPostsFromNotion();

  return (
    <div id="posts">
      {allPosts.map((post) => (
        <div key={post.slug} data-post={JSON.stringify(post)} />
      ))}
    </div>
  );
}
