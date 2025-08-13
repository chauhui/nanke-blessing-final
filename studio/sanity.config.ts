// 暫時停用自訂 CSS，確保回到 Sanity 預設滾動模型
// import './public/custom-dark-fix.css'

import {defineConfig, buildLegacyTheme} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
// @ts-ignore
// import {userSyncPlugin} from './plugins/userSyncPlugin/src/index.jsx'  // ← 暫時停用
import {structure} from './deskStructure'

// 保守主題（只改品牌/狀態/焦點色，不動前景/背景）
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
  theme: balancedTheme,

  plugins: [
    deskTool({structure}),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    // userSyncPlugin(),  // ← 暫時拿掉
  ],

  schema: { types: schemaTypes },
  document: { actions: (prev) => prev },

  server: { port: 3334, hostname: 'localhost' },
  logging: { level: 'debug', console: true },
  staticDir: './public',
})
