import './public/custom-dark-fix.css'

import {defineConfig, buildLegacyTheme} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
// @ts-ignore
import {userSyncPlugin} from './plugins/userSyncPlugin/src/index.jsx'
import {structure} from './deskStructure'

// 保守主題：僅品牌/焦點/狀態色，不覆蓋 component 前景/背景
const props = {
  '--my-blue':  '#60a5fa',
  '--my-red':   '#ef4444',
  '--my-yellow':'#f59e0b',
  '--my-green': '#22c55e',
}
const balancedTheme = buildLegacyTheme({
  '--brand-primary': props['--my-blue'],
  '--default-button-primary-color': props['--my-blue'],
  '--default-button-success-color': props['--my-green'],
  '--default-button-warning-color': props['--my-yellow'],
  '--default-button-danger-color': props['--my-red'],
  '--state-info-color': props['--my-blue'],
  '--state-success-color': props['--my-green'],
  '--state-warning-color': props['--my-yellow'],
  '--state-danger-color': props['--my-red'],
  '--focus-color': props['--my-blue'],
})

export default defineConfig({
  name: 'default',
  title: 'Church Site',
  projectId: 'von9yh08',
  dataset: 'production',
  basePath: '/studio',

  // 使用保守主題，避免破壞桌面視覺
  theme: balancedTheme,

  plugins: [
    deskTool({structure}),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    userSyncPlugin(),
  ],

  schema: { types: schemaTypes },

  document: { actions: (prev) => prev },

  server: { port: 3334, hostname: 'localhost' },

  logging: { level: 'debug', console: true },

  staticDir: './public',
})
