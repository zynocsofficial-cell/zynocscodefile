import type { IncomingMessage, ServerResponse } from 'http';
import { handleApiRequest } from '../server/api.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const handled = await handleApiRequest(req, res);
    if (!handled) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
  } catch (err: any) {
    console.error('Vercel API error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error', details: err?.message }));
  }
}
