'use client';

import { useEffect, useState } from 'react';

import { Post } from '@/types/post';
import { getPostsFromCachePageClient } from '@/utils/get-posts-from-cache-page-client';
import { getRevalidatedAt } from '@/utils/get-revalidated-at';

export default function SyncPage() {
  const [message, setMessage] = useState('');
  const [slugs, setSlugs] = useState<string[]>([]);

  const sync = async (password: string) => {
    setMessage('Detecting changes');
    const prevPosts = await getPostsFromCachePageClient();
    const postsRes = await fetch(`/api/posts?password=${password}`);

    if (postsRes.status === 403) {
      setMessage('Wrong password');
      return false;
    }
    if (postsRes.status === 500) {
      setMessage('Notion api error, try again later');
      return false;
    }
    const { posts }: { posts: Post[] } = await postsRes.json();

    const slugsToRevalidate: string[] = [];

    const revalidatedAtListPromise: Promise<number>[] = [];
    for (const post of posts) {
      if (prevPosts.find((p) => p.slug === post.slug)) {
        revalidatedAtListPromise.push(getRevalidatedAt(post.slug));
      }
    }
    const revalidatedAtList = await Promise.all(revalidatedAtListPromise);

    posts.forEach((post, index) => {
      if (post.lastEditedAt > revalidatedAtList[index]) {
        slugsToRevalidate.push(post.slug);
      }
    });

    prevPosts.forEach(({ slug }) => {
      if (!posts.map(({ slug }) => slug).includes(slug)) {
        slugsToRevalidate.push(slug);
      }
    });

    if (slugsToRevalidate.length === 0) {
      setMessage('No posts changed');
      return false;
    } else {
      setMessage('Revalidating...');
      setSlugs(slugsToRevalidate);

      const promises: Promise<Response>[] = [];
      await fetch(`/api/revalidate?path=/cache&password=${password}`);
      promises.push(fetch(`/api/revalidate?path=/blog&password=${password}`));
      slugsToRevalidate.forEach((slug) => {
        promises.push(
          fetch(`/api/revalidate?path=/blog/${slug}&password=${password}`)
        );
      });
      await Promise.all(promises);
      return true;
    }
  };

  useEffect(() => {
    let password;
    while (!password) {
      password = prompt('Enter password');
    }

    sync(password).then((revalidated) => {
      if (revalidated) {
        setMessage('Sync Finished!');
      }
    });
  }, []);

  return (
    <div className="mt-[10vh] text-center">
      <p className="text-3xl">{message}</p>
      {slugs.length > 0 && (
        <ul className="mt-4">
          {slugs.map((slug) => (
            <li key={slug}>{slug}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
