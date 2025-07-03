import './public/custom-dark-fix.css';

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
// @ts-ignore
import { userSyncPlugin } from './plugins/userSyncPlugin/src/index.jsx'
import { structure } from './deskStructure'

export default defineConfig({
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
      structure, // 客製化左側選單
    }),
    visionTool(),
    userSyncPlugin(),
  ],

  schema: {
    types: schemaTypes, // 直接接收 export 出來的 array
  },

  document: {
    actions: (prev, { schemaType }) => prev,
  },

  server: {
    port: 3334,
    hostname: 'localhost',
  },

  logging: {
    level: 'debug',
    console: true,
  },

  staticDir: './public',
})
