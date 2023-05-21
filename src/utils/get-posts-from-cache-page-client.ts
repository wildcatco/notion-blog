import { Post } from '@/types/post';

export async function getPostsFromCachePageClient() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cache`);
  const html = await response.text();
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, 'text/html');

  const prevPosts: Post[] = [];
  dom.querySelectorAll<HTMLDivElement>('#posts>div').forEach((node) => {
    node.dataset.post && prevPosts.push(JSON.parse(node.dataset.post));
  });

  return prevPosts;
}
