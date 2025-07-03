import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: 'von9yh08', // 例如 von9yh08
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  try {
    const { amount, name, type, note } = req.body;
    if (!amount || !name || !type) {
      return res.status(400).json({ message: '缺少必要欄位' });
    }
    const doc = {
      _type: 'donation',
      amount,
      name,
      type,
      note: note || '',
      createdAt: new Date().toISOString(),
    };
    const created = await sanity.create(doc);
    return res.status(200).json({ success: true, doc: created });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server Error' });
  }
}
