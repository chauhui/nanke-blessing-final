import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Test API endpoint hit');
  return res.status(200).json({ message: 'API is working!' });
}
