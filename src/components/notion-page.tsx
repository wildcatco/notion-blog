'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useTheme } from 'next-themes';
import { Block, ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

import CategoryList from '@/components/category-list';
import useMounted from '@/hooks/use-mounted';
import '@/styles/notion.css';
import { Post } from '@/types/post';

export default function NotionPage({
  post,
  recordMap,
}: {
  post: Post;
  recordMap: ExtendedRecordMap;
}) {
  const { theme } = useTheme();
  const mounted = useMounted();

  return (
    <NotionRenderer
      darkMode={mounted ? theme === 'dark' : false}
      recordMap={recordMap}
      fullPage
      forceCustomImages
      showTableOfContents
      disableHeader
      pageHeader={
        <div className="mb-4">
          <CategoryList categories={post.categories} />
        </div>
      }
      mapImageUrl={(url, block) => mapImageUrl(url, block) || ''}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
        nextImage: Image,
      }}
    />
  );
}

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
);
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
);

export function mapImageUrl(url: string, block: Block): string | null {
  if (!url) {
    return null;
  }

  if (url.startsWith('data:')) {
    return url;
  }

  // more recent versions of notion don't proxy unsplash images
  if (url.startsWith('https://images.unsplash.com')) {
    return url;
  }

  try {
    const u = new URL(url);

    if (
      u.pathname.startsWith('/secure.notion-static.com') &&
      u.hostname.endsWith('.amazonaws.com')
    ) {
      if (
        u.searchParams.has('X-Amz-Credential') &&
        u.searchParams.has('X-Amz-Signature') &&
        u.searchParams.has('X-Amz-Algorithm')
      ) {
        // if the URL is already signed, then use it as-is
        return url;
      }
    }
  } catch {
    // ignore invalid urls
  }

  if (url.startsWith('/images')) {
    url = `https://www.notion.so${url}`;
  }

  url = `https://www.notion.so${
    url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
  }`;

  const notionImageUrlV2 = new URL(url);
  let table = block.parent_table === 'space' ? 'block' : block.parent_table;
  if (table === 'collection' || table === 'team') {
    table = 'block';
  }
  notionImageUrlV2.searchParams.set('table', table);
  notionImageUrlV2.searchParams.set('id', block.id);
  notionImageUrlV2.searchParams.set('cache', 'v2');

  url = notionImageUrlV2.toString();

  return url;
}
