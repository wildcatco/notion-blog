import { NextResponse } from 'next/server';

import { getAllPostsFromNotion } from '@/services/posts';
import { getErrorMessage } from '@/utils/get-error-message';

export async function GET() {
  try {
    const allPosts = await getAllPostsFromNotion();
    return NextResponse.json({ posts: allPosts });
  } catch (e) {
    return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
  }
}
