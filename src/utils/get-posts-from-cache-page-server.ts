import { JSDOM } from 'jsdom';

import { Post } from '@/types/post';

export async function getPostsFromCachePageServer() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cache`);
  const html = await response.text();
  const dom = new JSDOM(html);

  const prevPosts: Post[] = JSON.parse(
    dom.window.document.querySelector<HTMLDivElement>('#posts')!.dataset.posts!
  );

  return prevPosts;
}
