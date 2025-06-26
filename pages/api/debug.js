export default function handler(req, res) {
  res.json({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN ? '有設定' : '沒設定',
  });
}
