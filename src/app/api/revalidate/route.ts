import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { getErrorMessage } from '@/utils/get-error-message';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');

  if (typeof path !== 'string' || !path) {
    return NextResponse.json({ message: 'Path is needed.' }, { status: 400 });
  }

  try {
    if (process.env.NODE_ENV !== 'development') {
      revalidatePath(path);
    }
    return NextResponse.json(
      { message: `Revalidated ${path}` },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'Failed to revalidate', error: getErrorMessage(e) },
      { status: 500 }
    );
  }
}
