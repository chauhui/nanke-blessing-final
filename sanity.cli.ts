import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'von9yh08',
    dataset: 'production',
  },
  server: {
    port: 3333,
  },
  // 為 vite 回呼函式明確指定 config 型別，避免 implicit any
  vite: (config: any) => ({
    ...config,
    base: '/studio',
  }),
});
