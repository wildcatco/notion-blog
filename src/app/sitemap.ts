import { MetadataRoute } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

import { getAllPostsFromNotion } from '@/services/posts';
import { getRevalidatedAt } from '@/utils/get-revalidated-at';

export default async function sitemap() {
  const allPosts = await getAllPostsFromNotion();
  const sitemap: MetadataRoute.Sitemap = [];

  for (const post of allPosts) {
    const revalidatedAt =
      process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
        ? new Date().getTime()
        : await getRevalidatedAt(post.slug);
    revalidatedAt &&
      sitemap.push({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(revalidatedAt),
      });
  }

  return sitemap;
}
