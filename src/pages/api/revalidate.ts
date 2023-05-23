import { NextApiRequest, NextApiResponse } from 'next';

import { getErrorMessage } from '@/utils/get-error-message';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query;

  if (typeof path !== 'string' || !path) {
    return res.status(400).json({
      message: 'Path is needed.',
    });
  }

  try {
    if (process.env.NODE_ENV !== 'development') {
      await res.revalidate(path);
    }
    return res.status(201).json({ message: `Revalidated ${path}` });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Failed to revalidate', error: getErrorMessage(e) });
  }
}
