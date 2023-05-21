'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from 'next-themes';
import { ExtendedRecordMap } from 'notion-types';
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
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
        nextLink: Link,
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
