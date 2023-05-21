import { NextApiRequest } from 'next';

export function getBaseUrlFromReq(req: NextApiRequest) {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  return `${protocol}://${host}`;
}
