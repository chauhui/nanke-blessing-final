import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
// @ts-ignore
import { userSyncPlugin } from './plugins/userSyncPlugin/src/index.jsx'

import { structure } from './deskStructure'

export default defineConfig({
  // --- form 設定已移除 ---
  name: 'default',
  title: 'Church Site',
  projectId: 'von9yh08',
  dataset: 'production',
  basePath: '/studio',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',

  plugins: [
    deskTool({
      structure,
    }),
    visionTool(),
    userSyncPlugin(),
  ],

  schema: {
    types: schemaTypes,
  },

  // 這裡已經移除所有與 isAdmin 相關的自動 patch 動作
  document: {
    actions: (prev, { schemaType }) => {
      return prev
    },
  },

  // 服務器配置
  server: {
    port: 3334,
    hostname: 'localhost',
  },

  // 日誌配置
  logging: {
    level: 'debug',
    console: true,
  },

  // 靜態文件目錄
  staticDir: './public',
})
