/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nanke-blessing.vercel.app', // 你的正式網域
  generateRobotsTxt: true,                      // 自動產生 robots.txt
  sitemapSize: 7000,                            // 預設即可；太多頁會自動切成 sitemap-0.xml…
  exclude: [],                                  // 先不排除任何路由
};
